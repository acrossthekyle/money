'use client';

import Link from 'next/link';

import tw from '@/styles';

type Props = {
  href?: string;
  isDisabled?: boolean;
  onClick?: () => void;
};

export default function Navigate({
  children,
  href,
  isDisabled,
  onClick,
}: React.PropsWithChildren<Props>) {
  if (href) {
    return (
      <Link
        className={styles.container}
        href={href}
        onClick={onClick}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={styles.container}
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
    px-4 py-2
    text-xs text-white dark:text-black
    uppercase
    font-medium
    tracking-wide
    bg-black dark:bg-white

    motion-safe:duration-300

    hover:bg-black
    hover:text-white

    md:text-tiny
    md:rounded-lg
  `,
});
