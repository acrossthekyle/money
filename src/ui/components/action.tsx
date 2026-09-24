import Link from 'next/link';

import tw, { cs } from '@/styles';

type Props = {
  className?: string;
  disabled?: boolean;
  href?: string;
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
  onClick,
  target,
  title,
  type,
}: React.PropsWithChildren<Props>) {
  if (onClick || type === 'submit') {
    return (
      <button
        className={cs(styles.container, className)}
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
        className={cs(styles.container, className, disabled && styles.disabled)}
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
    flex items-center gap-2
    py-1 px-2
    uppercase
    text-xs
    font-medium
    border border-current/62.5
    rounded-sm
    tracking-wide

    disabled:opacity-50

    motion-safe:duration-300

    hover:border-current/90

    md:text-tiny
  `,
  disabled: `
    pointer-events-none
    opacity-50
  `,
});
