import { Scale } from 'lucide-react';
import Link from 'next/link';

import tw from '@/styles';

export default async function Links() {
  return (
    <nav className={styles.container}>
      <Link className={styles.link} href="/">
        <Scale className={styles.icon} />
        <span>Money</span>
      </Link>
      <Link className={styles.link} href="/">
        Overview
      </Link>
      <Link className={styles.link} href="/calendar">
        Calendar
      </Link>
    </nav>
  );
};

const styles = tw({
  container: `
    flex items-center gap-2
  `,
  link: `
    flex items-center gap-2
    p-2
    text-tiny
    uppercase
    font-black
  `,
  icon: `
    w-4 h-4
  `,
});
