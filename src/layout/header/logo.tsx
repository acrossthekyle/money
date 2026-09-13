import { Stone } from 'lucide-react';
import Link from 'next/link';

import tw from '@/styles';

export default function Logo() {
  return (
    <Link className={styles.anchor} href="/">
      <Stone className={styles.icon} /> Basalt
    </Link>
  );
};

const styles = tw({
  anchor: `
    flex items-center gap-2
    p-2
    text-sm
    uppercase
    font-medium
    tracking-widest

    md:text-xs
  `,
  icon: `
    w-4 h-4
    stroke-2
  `,
});
