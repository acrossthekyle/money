import Link from 'next/link';

import tw, { cs } from '@/styles';

type Props = {
  className?: string;
  disabled?: boolean;
  href?: string;
  mode?: 'primary' | 'secondary' | 'tertiary';
  onClick?: () => void;
  target?: string;
  title?: string;
  type?: 'submit' | 'button' | 'reset';
};

export default function Action({
  children,
  className = '',
  disabled,
  href,
  mode = 'primary',
  onClick,
  target,
  title,
  type,
}: React.PropsWithChildren<Props>) {
  if (onClick || type === 'submit') {
    return (
      <button
        className={
          cs(
            styles.container,
            className,
            mode === 'primary' && styles.primary,
            mode === 'secondary' && styles.secondary,
            mode === 'tertiary' && styles.tertiary,
          )
        }
        disabled={disabled}
        onClick={onClick}
        title={title}
        type={type || 'button'}
      >
        {children}
      </button>
    );
  }

  if (href) {
    return (
      <Link
        className={
          cs(
            styles.container,
            className,
            disabled && styles.disabled,
            mode === 'primary' && styles.primary,
            mode === 'secondary' && styles.secondary,
            mode === 'tertiary' && styles.tertiary,
          )
        }
        href={href}
        target={target || '_self'}
        title={title}
      >
        {children}
      </Link>
    );
  }

  return null;
};

const styles = tw({
  container: `
    group
    flex items-center gap-2
    py-1.25 pl-1.25 pr-1.25
    uppercase
    text-sm text-(--foreground)
    border border-current/62.5
    rounded-md
    tracking-wide

    disabled:opacity-50

    md:text-xs
  `,
  primary: `
    !text-(--background)
    bg-(--foreground)

    motion-safe:duration-300

    hover:bg-(--background)
    hover:!text-(--foreground)
  `,
  secondary: `
    bg-(--background)
    text-(--foreground)

    motion-safe:duration-300

    hover:border-current/90
  `,
  tertiary: `
    text-(--foreground)
    border-transparent

    motion-safe:duration-300
  `,
  disabled: `
    pointer-events-none
    opacity-50
  `,
});
