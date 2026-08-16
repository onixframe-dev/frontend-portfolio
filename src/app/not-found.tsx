import { ArrowLeft } from 'lucide-react';
import { AnimatedTitle } from '@/components/ui/AnimatedTitle';
import { Button } from '@/components/ui/Button';
import { SectionSubtitle } from '@/components/ui/SectionSubtitle';
import styles from './error-states.module.css';

export default function NotFound() {
  return (
    <main className={styles.errorPage}>
      <section className={styles.panel} aria-labelledby="not-found-title">
        <span className={styles.eyebrow}>404</span>
        <AnimatedTitle as="h1" className={styles.title} id="not-found-title">
          Страница не найдена
        </AnimatedTitle>
        <SectionSubtitle className={styles.text}>
          Такой страницы нет или ссылка изменилась. Вернитесь на главную и выберите нужный
          раздел.
        </SectionSubtitle>
        <div className={styles.actions}>
          <Button href="/" variant="priceFeatured">
            <ArrowLeft size={17} />
            На главную
          </Button>
          <Button href="/#catalog" variant="price">
            К проектам
          </Button>
        </div>
      </section>
    </main>
  );
}
