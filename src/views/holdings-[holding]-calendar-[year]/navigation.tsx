'use client';

import { ChevronLeft, ChevronRight, Undo2 } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

import tw from '@/styles';
import type { CalendarYear } from '@/types';
import Ui from '@/ui';

type Props = {
  calendar: CalendarYear;
  id: string;
  isThisYear: boolean;
};

export default function Navigation({ calendar, id, isThisYear }: Props) {
  const params = useSearchParams();

  return (
    <>
      <Ui.Components.Action
        className={styles.cancel}
        href={`/holdings/${id}/${params.get('ref')}`}
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
          disabled={isThisYear}
          href={`/holdings/${id}/calendar/${calendar.previous}?ref=${params.get('ref')}`}
          mode="secondary"
        >
          <Ui.Components.Icon>
            <ChevronLeft className={styles.icon} />
          </Ui.Components.Icon>
          <Ui.Components.Text right>
            {calendar.previous}
          </Ui.Components.Text>
        </Ui.Components.Action>
        <span>{calendar.year}</span>
        <Ui.Components.Action
          href={`/holdings/${id}/calendar/${calendar.next}?ref=${params.get('ref')}`}
          mode="secondary"
        >
          <Ui.Components.Text left>
            {calendar.next}
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
