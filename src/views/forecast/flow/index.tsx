import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';

import tw, { cs } from '@/styles';
import type { CalendarDay } from '@/types';
import Ui from '@/ui';
import { currency } from '@/utils';

import { getChange, getFlow } from './utils';

type Props = {
  months: Array<CalendarDay[]>;
};

export default function Flow({ months }: Props) {
  const current = getFlow(months[0]);
  const next = getFlow(months[1]);

  return (
    <Ui.Components.Card.Container>
      <Ui.Components.Card.Header>
        <Ui.Components.Card.Title>
          Cash Flow
        </Ui.Components.Card.Title>
        <Ui.Components.Card.Subtitle>
          Income and expenses
        </Ui.Components.Card.Subtitle>
      </Ui.Components.Card.Header>
      <ul className={styles.items}>
        <li className={styles.item}>
          <Ui.Components.Card.Content>
            <h4 className={styles.heading}>
              Income
              <ArrowDownLeft className={cs(styles.arrow, styles.positive)} />
            </h4>
            <p className={styles.amount}>
              ${currency(current.income, true)}
            </p>
            <p className={styles.next}>
              {getChange(current.income, next.income)}% Next month
            </p>
          </Ui.Components.Card.Content>
        </li>
        <li className={styles.item}>
          <Ui.Components.Card.Content>
            <h4 className={styles.heading}>
              Expenses
              <ArrowUpRight className={cs(styles.arrow, styles.negative)} />
            </h4>
            <p className={styles.amount}>
              ${currency(current.expenses, true)}
            </p>
            <p className={styles.next}>
              {getChange(current.expenses, next.expenses)}% Next month
            </p>
          </Ui.Components.Card.Content>
        </li>
      </ul>
    </Ui.Components.Card.Container>
  );
};

const styles = tw({
  items: `
    flex gap-4
  `,
  item: `
    w-full
  `,
  heading: `
    flex items-center justify-between
    w-full

    lg:text-sm
  `,
  amount: `
    my-1
    text-xl

    sm:text-base
  `,
  next: `
    text-sm text-current/62.5
  `,
  arrow: `
    size-4.5
    stroke-1

    sm:size-4
  `,
  negative: `
    text-red-500

    dark:text-rose-400
  `,
  positive: `
    text-green-700

    dark:text-lime-500
  `,
});
