import { Plus } from 'lucide-react';
import Link from 'next/link';

import tw from '@/styles';
import type { CalendarDay } from '@/types';

type Props = {
  active: string;
  day: CalendarDay;
};

export default function Add({ active, day }: Props) {
  return (
    <Link
      href={`/${active}/transactions/${day.dateable.iso}/add`}
    >
      <Plus className={styles.icon} />
    </Link>
  );
};

const styles = tw({
  icon: `
    size-6
    stroke-2
  `,
});
