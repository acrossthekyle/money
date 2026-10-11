import { TextAlignJustifyStart } from 'lucide-react';
import Link from 'next/link';

import tw from '@/styles';

export default function Anchor() {
  return (
    <Link className={styles.anchor} href="/" title="View portfolio">
      <TextAlignJustifyStart className={styles.icon} />
    </Link>
  );
};

const styles = tw({
  anchor: `
    flex items-center gap-2
    text-base
    uppercase
    font-medium
    tracking-widest
    p-2

    md:text-sm
  `,
  icon: `
    w-4 h-4
    stroke-2
  `,
});
