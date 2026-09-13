'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import tw from '@/styles';

type Props = {
  isAuthenticated: boolean;
};

export default function Navigation({ isAuthenticated }: Props) {
  const current = usePathname();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <nav className={styles.container}>
      <Link
        className={
          [
            styles.link,
            current === '/' && styles.active,
          ].filter(Boolean).join(' ')
        }
        href="/"
      >
        Dashboard
      </Link>
      <Link
        className={
          [
            styles.link,
            current === '/calendar' && styles.active,
          ].filter(Boolean).join(' ')
        }
        href="/calendar"
      >
        Calendar
      </Link>
    </nav>
  );
};

const styles = tw({
  container: `
    absolute left-4 right-4 top-10.5
    flex items-center gap-0
    border border-current/12.5
    rounded-full

    xs:left-1/2
    xs:-translate-x-1/2
    xs:right-auto
    md:top-4
  `,
  link: `
    flex-1
    px-3 py-2

    text-base text-center
    font-normal
    leading-[1]

    xs:flex-none
    xs:text-xs
    xs:uppercase
    md:text-tiny
    md:font-semibold
  `,
  active: `
    rounded-full
    bg-(--foreground)
    text-(--background)
  `,
});
