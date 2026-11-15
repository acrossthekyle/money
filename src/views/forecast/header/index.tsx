'use client';

import tw from '@/styles';
import type { CalendarDay, Holding } from '@/types'
import Ui from '@/ui';
import { currency } from '@/utils';

import Options from './options';
import { useModel } from './model';

type Props = {
  days: CalendarDay[];
  holding: Holding;
  pinned: string;
};

export default function Header({ days, holding, pinned }: Props) {
  const { worth } = useModel();

  const today = days.find(({ dateable }) => dateable.isToday) ?? days.filter(({ dateable }) => dateable.isInMonth)[0];

  const percent = (today.balance / worth) * 100;

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>
        <span className={styles.name}>
          {holding.name}
        </span>
        <span className={styles.lid}>
          {holding.type === 'property' ? 'Asset' : 'Account'}
        </span>
      </h1>
      <p className={styles.balance}>
        <span className={styles.title}>Balance</span>
        <span className={styles.amount}>${currency(today.balance, true)}</span>
        <span className={styles.projected}>
          As of {today.dateable.display}
        </span>
      </p>
      <Options holding={holding} pinned={pinned} />
      <Ui.Components.Progress.Container>
        <Ui.Components.Progress.Bar>
          <Ui.Components.Progress.Progress percent={percent} />
        </Ui.Components.Progress.Bar>
        <Ui.Components.Progress.Labels>
          <Ui.Components.Progress.Amount>
            {currency(percent)}% of Net Worth
          </Ui.Components.Progress.Amount>
          <Ui.Components.Progress.Total>
            ${currency(worth, true)}
          </Ui.Components.Progress.Total>
        </Ui.Components.Progress.Labels>
      </Ui.Components.Progress.Container>
    </div>
  );
};

const styles = tw({
  container: `
    relative
    mb-5
  `,
  header: `
    flex flex-col
  `,
  name: `
    text-xl
    font-semibold

    sm:text-lg
  `,
  lid: `
    text-sm text-current/62.5
    capitalize
  `,
  balance: `
    flex flex-col
    mt-6
  `,
  title: `
    text-sm
  `,
  amount: `
    text-3xl
    font-medium
  `,
  projected: `
    text-sm text-current/62.5
    font-normal
  `,
})
