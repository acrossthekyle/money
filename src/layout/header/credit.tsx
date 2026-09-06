import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

import tw from '@/styles';

export default async function Credit() {
  return (
    <Link
      className={styles.container}
      href="https://acrossthekyle.com"
      target="_blank"
    >
      <span>Created By</span>
      <ArrowUpRight className={styles.icon} />
    </Link>
  );
};

const styles = tw({
  container: `
    flex items-center gap-1
    p-2
    text-tiny
    uppercase
    font-bold
  `,
  icon: `
    w-3 h-3
  `,
});
