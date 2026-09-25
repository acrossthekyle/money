'use client';

import { ChevronLeft, ChevronRight, Undo2 } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

import tw from '@/styles';
import type { CalendarYear } from '@/types';
import Ui from '@/ui';

type Props = {
  calendar: CalendarYear[];
  id: string;
  index: number;
};

export default function Navigation({ calendar, id, index }: Props) {
  const params = useSearchParams();

  const next = index === calendar.length - 1 ? calendar[0].year : calendar[index + 1].year;

  const previous = index === 0 ? calendar[calendar.length - 1].year : calendar[index - 1].year;

  return (
    <>
      <Ui.Components.Action
        className={styles.cancel}
        href={`/holding/${id}/${params.get('ref')}`}
      >
        <Undo2 className={styles.icon} /> Cancel
      </Ui.Components.Action>
      <div className={styles.container}>
        <Ui.Components.Action
          href={`/holding/${id}/calendar/${previous}?ref=${params.get('ref')}`}
        >
          <ChevronLeft className={styles.icon} /> {previous}
        </Ui.Components.Action>
        <span>{calendar[index].year}</span>
        <Ui.Components.Action
          href={`/holding/${id}/calendar/${next}?ref=${params.get('ref')}`}
        >
          {next} <ChevronRight className={styles.icon} />
        </Ui.Components.Action>
      </div>
    </>
  );
};

const styles = tw({
  container: `
    flex items-center justify-between
    mt-8
    pb-4
    text-xl
    font-light

    md:text-lg
  `,
  icon: `
    w-3 h-3
    stroke-2
  `,
  cancel: `
    absolute top-12 right-6 z-10
  `,
})
