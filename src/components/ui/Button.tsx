'use client';

import type { MouseEventHandler, ReactNode } from 'react';
import styles from './Button.module.css';

type ButtonVariant =
  | 'primary'
  | 'ghost'
  | 'contact'
  | 'icon'
  | 'filter'
  | 'price'
  | 'priceFeatured'
  | 'modal';

type Props = {
  variant?: ButtonVariant;
  active?: boolean;
  className?: string;
  children: ReactNode;
  href?: string;
  target?: string;
  rel?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  ariaLabel?: string;
};

export function Button({
  variant = 'primary',
  active = false,
  className = '',
  children,
  href,
  target,
  rel,
  type = 'button',
  onClick,
  ariaLabel,
}: Props) {
  const variantClass = styles[variant] || '';
  const classes = [styles.button, variantClass, active ? styles.active : '', className]
    .filter(Boolean)
    .join(' ');

  if (href) {
    return (
      <a
        className={classes}
        href={href}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
        onClick={onClick as MouseEventHandler<HTMLAnchorElement>}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick as MouseEventHandler<HTMLButtonElement>}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
