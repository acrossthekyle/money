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
    absolute left-1/2 top-9
    -translate-x-1/2
    flex items-center gap-0
    border border-current/12.5
    rounded-full

    md:top-3
  `,
  link: `
    flex items-center
    px-3 py-1.5
    uppercase
    text-xs
    font-medium
    leading-[1]

    md:text-tiny
  `,
  active: `
    rounded-full
    bg-(--foreground)
    text-(--background)
  `,
});
