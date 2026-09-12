'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import tw from '@/styles';

import Navigation from './navigation';

type Props = {
  isAuthenticated: boolean;
};

export default function Links({ isAuthenticated }: Props) {
  const pathname = usePathname();

  return (
    <nav aria-label="primary navigation" className={styles.container}>
      <Link className={styles.link} href="/">
        Basalt
      </Link>
      <Navigation current={pathname} isAuthenticated={isAuthenticated} />
    </nav>
  );
};

const styles = tw({
  container: `
    flex items-center gap-3

    xxs:gap-4
  `,
  link: `
    p-2
    text-sm
    uppercase
    font-mono

    md:text-xs
  `,
});
