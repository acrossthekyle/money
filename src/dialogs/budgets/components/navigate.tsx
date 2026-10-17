'use client';

import Link from 'next/link';

import tw, { cs } from '@/styles';

type Props = {
  href?: string;
  isDisabled?: boolean;
  isOutline?: boolean;
  isPrimary?: boolean;
  onClick?: () => void;
};

export default function Navigate({
  children,
  href,
  isDisabled,
  isOutline,
  isPrimary,
  onClick,
}: React.PropsWithChildren<Props>) {
  if (href) {
    return (
      <Link
        className={
          cs(
            styles.container,
            isPrimary && styles.primary,
            isOutline && styles.outline,
          )
        }
        href={href}
        onClick={onClick}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={
        cs(
          styles.container,
          isPrimary && styles.primary,
          isOutline && styles.outline,
        )
      }
      disabled={isDisabled}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
};

const styles = tw({
  container: `
    flex items-center justify-center gap-3
    w-full
    border border-current/12
    rounded-full
    py-2.5
    text-sm text-(--background)
    bg-(--foreground)
    uppercase
    font-medium
    tracking-wide

    motion-safe:duration-300

    md:text-tiny
    md:rounded-lg
    md:py-2
  `,
  primary: `
    !bg-yellow-300
    !text-black
  `,
  outline: `
    !bg-transparent
    !text-(--foreground)
  `,
});
