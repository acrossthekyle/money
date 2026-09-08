import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

import tw from '@/styles';

export default function Back() {
  return (
    <Link className={styles.container} href="/">
      <ChevronLeft className={styles.icon} /> Dashboard
    </Link>
  );
};

const styles = tw({
  container: `
    flex items-center gap-2 order-0
    w-full
    rounded-full
    bg-(--background)
    border border-current/22.5
    py-1.25 pl-2 pr-3
    font-medium
    text-tiny
    whitespace-nowrap
    uppercase
    leading-[1]
    tracking-wide

    motion-safe:duration-300

    hover:border-current/62.5

    md:w-fit
  `,
  icon: `
    w-3 h-3
  `,
});
