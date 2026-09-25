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
        <Ui.Components.Icon>
          <Undo2 className={styles.icon} />
        </Ui.Components.Icon>
        <Ui.Components.Text right>
          Back
        </Ui.Components.Text>
      </Ui.Components.Action>
      <div className={styles.container}>
        <Ui.Components.Action
          href={`/holding/${id}/calendar/${previous}?ref=${params.get('ref')}`}
        >
          <Ui.Components.Icon>
            <ChevronLeft className={styles.icon} />
          </Ui.Components.Icon>
          <Ui.Components.Text right>
            {previous}
          </Ui.Components.Text>
        </Ui.Components.Action>
        <span>{calendar[index].year}</span>
        <Ui.Components.Action
          href={`/holding/${id}/calendar/${next}?ref=${params.get('ref')}`}
        >
          <Ui.Components.Text left>
            {next}
          </Ui.Components.Text>
          <Ui.Components.Icon>
            <ChevronRight className={styles.icon} />
          </Ui.Components.Icon>
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
    text-base
  `,
  icon: `
    w-3 h-3
    stroke-2
  `,
  cancel: `
    absolute top-12 right-6 z-10
  `,
})
