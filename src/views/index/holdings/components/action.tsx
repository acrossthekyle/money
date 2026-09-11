'use client';

import Link from 'next/link';

import tw from '@/styles';

type Props = {
  isAbsolute?: boolean;
  onClick?: () => void;
  uri?: string;
};

export default function Action({
  children,
  isAbsolute = false,
  onClick,
  uri = '/',
}: React.PropsWithChildren<Props>) {
  if (onClick) {
    return (
      <button
        className={
          [
            styles.container,
            isAbsolute && styles.absolute,
          ].filter(Boolean).join(' ')
        }
        onClick={onClick}
        type="button"
      >
        {children}
      </button>
    );
  }

  return (
    <Link
      className={[styles.container, styles.link].join(' ')}
      href={uri}
    >
      {children}
    </Link>
  );
};

const styles = tw({
  container: `
    flex items-center gap-2
    w-fit
    border border-(--foreground)/22.5
    pl-3 pr-2 py-2
    bg-(--background)
    rounded-full
    text-tiny
    font-medium
    uppercase

    motion-safe:duration-300

    hover:border-(--foreground)/62.5

    md:py-1.25
    md:text-xtiny
  `,
  absolute: `
    absolute top-4 right-3.5
  `,
  link: `
    bg-(--foreground)
    text-(--background)
    border-0

    hover:bg-(--foreground)/70
    hover:dark:bg-(--foreground)/80
  `,
});
