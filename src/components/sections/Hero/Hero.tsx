"use client";

import { useEffect, useRef, type PointerEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "../../ui/Button";
import sectionStyles from "../../ui/Section.module.css";
import styles from "./Hero.module.css";

const PARTICLE_ROWS = 15;
const PARTICLE_SPACING_REM = 1.8;

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const idleTimeoutRef = useRef<ReturnType<typeof setTimeout>>();
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
    const particles = Array.from({ length: totalParticles }, (_, index) => {
      const row = Math.floor(index / PARTICLE_ROWS);
      const col = index % PARTICLE_ROWS;
      const distance = Math.sqrt((row - center) ** 2 + (col - center) ** 2);

      return {
        row,
        col,
        distance,
        scale: Math.max(0.1, 1.2 - distance * 0.12),
        opacity: Math.max(0.05, 1 - distance * 0.1),
        hue: 184 + distance * 7,
        lightness: Math.max(42, 76 - distance * 4),
      };
    });

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const pixelRatio = window.devicePixelRatio || 1;

      canvas.width = Math.floor(rect.width * pixelRatio);
      canvas.height = Math.floor(rect.height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let observer: IntersectionObserver | null = null;

    const stopAnimation = () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = undefined;
      }
    };

    const animate = () => {
      const currentTime = (Date.now() - startTimeRef.current) * 0.001;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const gridSize = PARTICLE_ROWS * PARTICLE_SPACING_REM * 16;
      const bottomSafeArea = 70;
      const startX = (width - gridSize) / 2;
      const startY = Math.max(28, (height - bottomSafeArea - gridSize) / 2);

      if (modeRef.current === "auto") {
        const autoCursor = {
          x: Math.sin(currentTime * 0.3) * 200 + Math.sin(currentTime * 0.17) * 100,
          y: Math.cos(currentTime * 0.2) * 150 + Math.cos(currentTime * 0.23) * 80,
        };

        if (autoReturnRef.current.active) {
          const elapsed = Date.now() - autoReturnRef.current.startedAt;
          const progress = Math.min(elapsed / 1400, 1);
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
        const strength = Math.min(Math.max((idleTime - 220) / 1000, 0), 1);
        cursorRef.current = {
          x: staticCursorRef.current.x + Math.sin(currentTime * 1.4) * 18 * strength,
          y: staticCursorRef.current.y + Math.cos(currentTime * 1.15) * 14 * strength,
        };
      }

      context.clearRect(0, 0, width, height);

      particles.forEach(({ row, col, distance, scale, opacity, hue, lightness }) => {
        const dampening = Math.max(0.3, 1 - distance * 0.08);
        const wave = Math.sin(currentTime * 1.5 + row * 0.42 + col * 0.24) * 2;
        const x = startX + col * PARTICLE_SPACING_REM * 16 + cursorRef.current.x * dampening + wave;
        const y = startY + row * PARTICLE_SPACING_REM * 16 + cursorRef.current.y * dampening - wave;
        const radius = 3.2 * scale;
        const fadeStart = height - bottomSafeArea;
        const edgeFade = Math.min(1, Math.max(0, (height - y) / bottomSafeArea));
        const visibleOpacity = y > fadeStart ? opacity * edgeFade : opacity;

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
      if (!animationFrameRef.current) {
        startTimeRef.current = Date.now();
        animate();
      }
    };

    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          startAnimation();
        } else {
          stopAnimation();
        }
      });
      observer.observe(canvas);
    } else {
      startAnimation();
    }

    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", resizeCanvas);
      stopAnimation();
      if (idleTimeoutRef.current) {
        clearTimeout(idleTimeoutRef.current);
      }
    };
  }, []);

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const nextCursor = {
      x: (event.clientX - (rect.left + rect.width / 2)) * 0.8,
      y: (event.clientY - (rect.top + rect.height / 2)) * 0.8,
    };

    cursorRef.current = nextCursor;
    staticCursorRef.current = nextCursor;
    modeRef.current = "pointer";
    autoReturnRef.current.active = false;
    lastPointerMoveRef.current = Date.now();

    if (idleTimeoutRef.current) {
      clearTimeout(idleTimeoutRef.current);
    }

    idleTimeoutRef.current = setTimeout(() => {
      modeRef.current = "static";
    }, 500);

    window.setTimeout(() => {
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
          <span className={styles.heroLine}>Чистый frontend</span>
          <span className={styles.heroLine}>для премиальных</span>
          <span className={styles.heroLine}>проектов</span>
        </h1>
        <p className={styles.heroText}>
          Современные сайты и интерфейсы
          <br />
          на React, Next.js и TypeScript.
          <br />
          Адаптивная вёрстка, архитектура проекта.
          <br />
          Быстрый запуск.
        </p>
        <div className={styles.heroButtons}>
          <Button variant="primary" href="#pricing">
            Прайс-лист <ArrowUpRight size={18} />
          </Button>
          <Button variant="ghost" href="#catalog">Портфолио</Button>
        </div>
      </div>

    </section>
  );
}
