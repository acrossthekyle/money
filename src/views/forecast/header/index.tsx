'use client';

import { format, parseISO } from 'date-fns';

import { DATE_DISPLAY_ABBREVIATED } from '@/constants';
import tw from '@/styles';
import type { CalendarDay, Holding } from '@/types'
import Ui from '@/ui';
import { currency } from '@/utils';

import Options from './options';
import { useModel } from './model';

type Props = {
  days: CalendarDay[];
  holding: Holding;
};

export default function Header({ days, holding }: Props) {
  const { worth } = useModel();

  const today = days.find(({ dateable }) => dateable.isToday) ?? days.filter(({ dateable }) => dateable.isInMonth)[0];

  const percent = (today.balance / worth) * 100;

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.header}>
        {holding.name}
      </h1>
      <p className={styles.lid}>
        {holding.type === 'property' ? 'Asset' : 'Account'} • Updated on {holding.updated ? format(parseISO(holding.updated), DATE_DISPLAY_ABBREVIATED) : '--/--/----'}
      </p>
      <h2 className={styles.heading}>
        Balance
      </h2>
      <p className={styles.text}>
        As of {today.dateable.display}
      </p>
      <div className={styles.container}>
        <p>
          {today.balance < 0 ? '-' : ''}${currency(today.balance)}
        </p>
        <Options />
        <Ui.Components.Progress.Container>
          <Ui.Components.Progress.Bar>
            <Ui.Components.Progress.Progress percent={percent} />
          </Ui.Components.Progress.Bar>
          <Ui.Components.Progress.Labels>
            <Ui.Components.Progress.Amount>
              {holding.type === 'credit_card' ? '0' : currency(percent)}% of Net Worth
            </Ui.Components.Progress.Amount>
            <Ui.Components.Progress.Total>
              ${currency(worth, true)}
            </Ui.Components.Progress.Total>
          </Ui.Components.Progress.Labels>
        </Ui.Components.Progress.Container>
      </div>
    </div>
  );
};

const styles = tw({
  wrapper: `
    relative
    mb-5
  `,
  header: `
    mb-1
    font-medium
    leading-[1]
  `,
  lid: `
    text-sm text-current/62.5
  `,
  heading: `
    mt-5
    text-sm
  `,
  text: `
    mb-3
    text-sm text-current/62.5
  `,
  container: `
    p-4
    w-full
    rounded-xl
    bg-neutral-200/62.5

    dark:bg-neutral-800/62.5
  `,
})
