'use client';

import tw from '@/styles';
import type { CalendarDay, Holding } from '@/types'
import Ui from '@/ui';
import { currency } from '@/utils';

import { useModel } from './model';
import Update from './update';

type Props = {
  days: CalendarDay[];
  holding: Holding;
};

export default function Header({ days, holding }: Props) {
  const { handleOnEdit, worth } = useModel();

  const today = days
    .find(({ dateable }) => dateable.isToday) ??
    days.filter(({ dateable }) => dateable.isInMonth)[0];

  const percent = (today.balance / worth) * 100;

  return (
    <Ui.Components.Card.Container>
      <h1 className={styles.header}>
        <Ui.Components.Card.Title>
          {holding.name}
        </Ui.Components.Card.Title>
        <Ui.Components.Card.Subtitle>
          As of {today.dateable.display}
        </Ui.Components.Card.Subtitle>
      </h1>
      <Update onClick={handleOnEdit} />
      <Ui.Components.Progress.Container>
        <p className={styles.balance}>
          {today.balance < 0 ? '-' : ''}${currency(today.balance)}
        </p>
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
    </Ui.Components.Card.Container>
  );
};

const styles = tw({
  header: `
    flex flex-col
  `,
  balance: `
    mb-2
    text-lg
  `,
})
