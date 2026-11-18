'use client';

import tw from '@/styles';
import type { CalendarDay, Holding } from '@/types'
import Ui from '@/ui';
import { currency } from '@/utils';

import Menu from './menu';
import { useModel } from './model';

type Props = {
  days: CalendarDay[];
  holding: Holding;
};

export default function Header({ days, holding }: Props) {
  const { handleOnEdit, handleOnMenu, worth } = useModel();

  const today = days
    .find(({ dateable }) => dateable.isToday) ??
    days.filter(({ dateable }) => dateable.isInMonth)[0];

  const percent = (today.balance / worth) * 100;

  return (
    <Ui.Components.Card.Container>
      <Ui.Components.Card.Header level={1}>
        <Ui.Components.Card.Title>
          {holding.name}
        </Ui.Components.Card.Title>
        <Ui.Components.Card.Subtitle>
          Balance as of {today.dateable.display}
        </Ui.Components.Card.Subtitle>
      </Ui.Components.Card.Header>
      <Menu onClick={handleOnMenu} />
      <Ui.Components.Card.Content>
        <p className={styles.balance}>
          {today.balance < 0 ? '-' : ''}${currency(today.balance)}
        </p>
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
      </Ui.Components.Card.Content>
      <Ui.Components.Button isGhost onClick={handleOnEdit}>
        Edit {holding.type === 'property' ? 'Asset' : 'Account'}
      </Ui.Components.Button>
    </Ui.Components.Card.Container>
  );
};

const styles = tw({
  balance: `
    mb-3
    text-xl
    leading-[1]

    sm:text-base
  `,
})
