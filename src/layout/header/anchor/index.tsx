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
    p-2
  `,
  icon: `
    w-5 h-5
    stroke-2

    md:w-4
    md:h-4
  `,
});
