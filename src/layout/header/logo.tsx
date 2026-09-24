import { Stone } from 'lucide-react';
import Link from 'next/link';

import tw from '@/styles';

export default function Logo() {
  return (
    <Link className={styles.anchor} href="/">
      <Stone className={styles.icon} /> Project Basalt
    </Link>
  );
};

const styles = tw({
  anchor: `
    flex items-center gap-2
    text-sm
    uppercase
    font-medium font-roboto
    tracking-widest
  `,
  icon: `
    w-4 h-4
    stroke-2
  `,
});
