import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

import tw from '@/styles';

export default function Anchor({ children }: React.PropsWithChildren) {
  return (
    <Link
      className={styles.container}
      href={`/calendar?view=${children}`}
    >
      View forecast
      <ChevronRight className={styles.icon} />
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
    text-xtiny
    font-medium
    uppercase

    motion-safe:duration-300

    hover:border-(--foreground)/62.5

    md:py-1.25
  `,
  icon: `
    w-2.5 h-2.5
    stroke-3
  `,
});
