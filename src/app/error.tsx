'use client';

import { useEffect } from 'react';
import { RefreshCcw } from 'lucide-react';
import { AnimatedTitle } from '@/components/ui/AnimatedTitle';
import { Button } from '@/components/ui/Button';
import { SectionSubtitle } from '@/components/ui/SectionSubtitle';
import styles from './error-states.module.css';

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className={styles.errorPage}>
      <section className={styles.panel} aria-labelledby="error-title">
        <span className={styles.eyebrow}>Ошибка</span>
        <AnimatedTitle as="h1" className={styles.title} id="error-title">
          Что-то пошло не так
        </AnimatedTitle>
        <SectionSubtitle className={styles.text}>
          Обновите страницу или вернитесь на главную. Если ошибка повторится, напишите мне в
          Telegram или email.
        </SectionSubtitle>
        <div className={styles.actions}>
          <Button type="button" variant="priceFeatured" onClick={reset}>
            <RefreshCcw size={17} />
            Попробовать снова
          </Button>
          <Button href="/" variant="price">
            На главную
          </Button>
        </div>
      </section>
    </main>
  );
}
