"use client";

import { useEffect, useRef, type PointerEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "../../ui/Button";
import sectionStyles from "../../ui/Section.module.css";
import styles from "./Hero.module.css";

const PARTICLE_ROWS = 15;
const PARTICLE_SPACING_REM = 1.8;

const getParticleConfig = (width: number) => {
  if (width <= 380) {
    return {
      sphereRadius: 146,
      radius: 1.6,
      autoX: 74,
      autoY: 58,
      pointerStrength: 0.34,
      bottomSafeArea: 58,
    };
  }

  if (width <= 560) {
    return {
      sphereRadius: 176,
      radius: 1.75,
      autoX: 92,
      autoY: 68,
      pointerStrength: 0.4,
      bottomSafeArea: 62,
    };
  }

  return {
    sphereRadius: PARTICLE_SPACING_REM * 16 * 7.2,
    radius: 2.2,
    autoX: 150,
    autoY: 108,
    pointerStrength: 0.62,
    bottomSafeArea: 70,
  };
};

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const idleTimeoutRef = useRef<number>();
  const autoModeTimeoutRef = useRef<number>();
  const canvasSizeRef = useRef({ width: 0, height: 0 });
  const cursorRef = useRef({ x: 0, y: 0 });
  const staticCursorRef = useRef({ x: 0, y: 0 });
  const modeRef = useRef<"auto" | "pointer" | "static">("auto");
  const startTimeRef = useRef(Date.now());
  const lastPointerMoveRef = useRef(Date.now());
  const autoReturnRef = useRef({
    active: false,
    startedAt: 0,
    fromX: 0,
    fromY: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const totalParticles = PARTICLE_ROWS * PARTICLE_ROWS;
    const center = Math.floor(PARTICLE_ROWS / 2);

    let resizeFrameId = 0;
    let idleCallbackId: number | undefined;
    let isHeroVisible = true;
    let isInitialized = false;
    let particles: Array<{
      row: number;
      col: number;
      normalizedX: number;
      normalizedY: number;
      distance: number;
      sphereZ: number;
      scale: number;
      opacity: number;
      hue: number;
      lightness: number;
    }> = [];

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const pixelRatio = window.devicePixelRatio || 1;
      const width = Math.floor(rect.width);
      const height = Math.floor(rect.height);

      if (width === canvasSizeRef.current.width && height === canvasSizeRef.current.height) {
        return;
      }

      canvasSizeRef.current = { width, height };
      canvas.width = Math.floor(width * pixelRatio);
      canvas.height = Math.floor(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const requestCanvasResize = () => {
      if (resizeFrameId) {
        return;
      }

      resizeFrameId = window.requestAnimationFrame(() => {
        resizeFrameId = 0;
        resizeCanvas();
      });
    };

    window.addEventListener("resize", requestCanvasResize, { passive: true });

    let observer: IntersectionObserver | null = null;

    const stopAnimation = () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = undefined;
      }
    };

    const animate = () => {
      const currentTime = (Date.now() - startTimeRef.current) * 0.001;
      const { width, height } = canvasSizeRef.current;

      if (!width || !height) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }
      const particleConfig = getParticleConfig(width);
      const bottomSafeArea = particleConfig.bottomSafeArea;
      const centerX = width / 2;
      const centerY = Math.max(28 + particleConfig.sphereRadius * 0.72, (height - bottomSafeArea) / 2);

      if (modeRef.current === "auto") {
        const autoCursor = {
          x: Math.sin(currentTime * 0.2) * particleConfig.autoX + Math.sin(currentTime * 0.11) * particleConfig.autoX * 0.42,
          y: Math.cos(currentTime * 0.16) * particleConfig.autoY + Math.cos(currentTime * 0.13) * particleConfig.autoY * 0.45,
        };

        if (autoReturnRef.current.active) {
          const elapsed = Date.now() - autoReturnRef.current.startedAt;
          const progress = Math.min(elapsed / 1900, 1);
          const eased = progress < 0.5
            ? 4 * progress ** 3
            : 1 - (-2 * progress + 2) ** 3 / 2;

          cursorRef.current = {
            x: autoReturnRef.current.fromX + (autoCursor.x - autoReturnRef.current.fromX) * eased,
            y: autoReturnRef.current.fromY + (autoCursor.y - autoReturnRef.current.fromY) * eased,
          };

          if (progress >= 1) {
            autoReturnRef.current.active = false;
          }
        } else {
          cursorRef.current = autoCursor;
        }
      }

      if (modeRef.current === "static") {
        const idleTime = Date.now() - lastPointerMoveRef.current;
        const strength = Math.min(Math.max((idleTime - 220) / 1400, 0), 1);
        cursorRef.current = {
          x: staticCursorRef.current.x + Math.sin(currentTime * 0.9) * 12 * strength,
          y: staticCursorRef.current.y + Math.cos(currentTime * 0.75) * 10 * strength,
        };
      }

      context.clearRect(0, 0, width, height);

      particles.forEach(({ row, col, normalizedX, normalizedY, distance, sphereZ, scale, opacity, hue, lightness }) => {
        if (distance > 1.08) return;

        const dampening = 0.22 + sphereZ * 0.78;
        const drift = Math.sin(currentTime * 0.72 + row * 0.34 + col * 0.22);
        const orbit = Math.cos(currentTime * 0.38 + normalizedY * 1.8) * 8 * sphereZ;
        const sphereX = normalizedX * particleConfig.sphereRadius * (0.9 + sphereZ * 0.12);
        const sphereY = normalizedY * particleConfig.sphereRadius * 0.92;
        const x = centerX + sphereX + cursorRef.current.x * dampening + orbit + drift * 1.4;
        const y = centerY + sphereY + cursorRef.current.y * dampening - drift * 1.2;
        const radius = particleConfig.radius * scale;
        const fadeStart = height - bottomSafeArea;
        const bottomFade = Math.min(1, Math.max(0, (height - y) / bottomSafeArea));
        const visibleOpacity = y > fadeStart ? opacity * bottomFade : opacity;

        if (visibleOpacity <= 0.01) return;

        context.save();
        context.globalCompositeOperation = "screen";
        context.globalAlpha = visibleOpacity;
        context.shadowBlur = Math.max(5, 18 * scale);
        context.shadowColor = `hsla(${hue}, 88%, 62%, 0.62)`;
        context.fillStyle = `hsl(${hue} 88% ${lightness}%)`;
        context.beginPath();
        context.arc(x, y, radius, 0, Math.PI * 2);
        context.fill();
        context.restore();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    const startAnimation = () => {
      if (!document.hidden && isInitialized && isHeroVisible && !animationFrameRef.current) {
        startTimeRef.current = Date.now();
        animate();
      }
    };

    const initializeAnimation = () => {
      particles = Array.from({ length: totalParticles }, (_, index) => {
        const row = Math.floor(index / PARTICLE_ROWS);
        const col = index % PARTICLE_ROWS;
        const normalizedX = (col - center) / center;
        const normalizedY = (row - center) / center;
        const distance = Math.sqrt(normalizedX ** 2 + normalizedY ** 2);
        const sphereZ = Math.sqrt(Math.max(0, 1 - distance ** 2));
        const edgeFade = Math.min(1, Math.max(0, (1.08 - distance) / 0.22));

        return {
          row,
          col,
          normalizedX,
          normalizedY,
          distance,
          sphereZ,
          scale: Math.max(0.18, 0.54 + sphereZ * 0.72),
          opacity: Math.max(0.03, (0.16 + sphereZ * 0.84) * edgeFade),
          hue: 184 + distance * 34,
          lightness: Math.max(38, 74 - distance * 18),
        };
      });
      resizeCanvas();
      isInitialized = true;
      startAnimation();
    };

    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(([entry]) => {
        isHeroVisible = entry.isIntersecting;

        if (isHeroVisible) {
          startAnimation();
        } else {
          stopAnimation();
        }
      });
      observer.observe(canvas);
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopAnimation();
      } else {
        startAnimation();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    const requestIdleCallback = (window as Window & {
      requestIdleCallback?: typeof window.requestIdleCallback;
      cancelIdleCallback?: typeof window.cancelIdleCallback;
    }).requestIdleCallback;
    const cancelIdleCallback = (window as Window & {
      cancelIdleCallback?: typeof window.cancelIdleCallback;
    }).cancelIdleCallback;

    if (typeof requestIdleCallback === "function") {
      idleCallbackId = requestIdleCallback(initializeAnimation, { timeout: 800 });
    } else {
      idleTimeoutRef.current = window.setTimeout(initializeAnimation, 250);
    }

    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", requestCanvasResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      stopAnimation();
      if (resizeFrameId) {
        window.cancelAnimationFrame(resizeFrameId);
      }
      if (idleCallbackId !== undefined && typeof cancelIdleCallback === "function") {
        cancelIdleCallback(idleCallbackId);
      }
      if (idleTimeoutRef.current) {
        clearTimeout(idleTimeoutRef.current);
      }
      if (autoModeTimeoutRef.current) {
        clearTimeout(autoModeTimeoutRef.current);
      }
    };
  }, []);

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const particleConfig = getParticleConfig(rect.width);
    const nextCursor = {
      x: (event.clientX - (rect.left + rect.width / 2)) * particleConfig.pointerStrength,
      y: (event.clientY - (rect.top + rect.height / 2)) * particleConfig.pointerStrength,
    };

    cursorRef.current = nextCursor;
    staticCursorRef.current = nextCursor;
    modeRef.current = "pointer";
    autoReturnRef.current.active = false;
    lastPointerMoveRef.current = Date.now();

    if (idleTimeoutRef.current) {
      clearTimeout(idleTimeoutRef.current);
    }

    idleTimeoutRef.current = window.setTimeout(() => {
      modeRef.current = "static";
    }, 500);

    if (autoModeTimeoutRef.current) {
      clearTimeout(autoModeTimeoutRef.current);
    }

    autoModeTimeoutRef.current = window.setTimeout(() => {
      if (Date.now() - lastPointerMoveRef.current >= 4000) {
        modeRef.current = "auto";
        startTimeRef.current = Date.now();
      }
    }, 4000);
  };

  const handlePointerLeave = () => {
    if (idleTimeoutRef.current) {
      clearTimeout(idleTimeoutRef.current);
    }

    autoReturnRef.current = {
      active: true,
      startedAt: Date.now(),
      fromX: cursorRef.current.x,
      fromY: cursorRef.current.y,
    };
    modeRef.current = "auto";
    startTimeRef.current = Date.now();
  };

  return (
    <section
      id="top"
      className={`${styles.hero} ${sectionStyles.sectionGrid}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div className={styles.particlesLayer} aria-hidden="true">
        <div className={styles.particles}>
          <canvas ref={canvasRef} className={styles.particleCanvas} />
        </div>
      </div>

      <div className={styles.heroCopy}>
        <h1>
          <span className={styles.heroLine}>Современные сайты</span>
          <span className={styles.heroLine}>и frontend-интерфейсы</span>
        </h1>
        <p className={styles.heroText}>
          Разрабатываю адаптивные сайты и веб-интерфейсы для бизнеса и digital-проектов.
          <br />
          От лендингов до React и Next.js приложений.
        </p>
        <div className={styles.heroButtons}>
          <Button variant="primary" href="#catalog">
            Посмотреть проекты <ArrowUpRight size={18} />
          </Button>
          <Button variant="ghost" href="#contacts">Обсудить проект</Button>
        </div>
      </div>

    </section>
  );
}
