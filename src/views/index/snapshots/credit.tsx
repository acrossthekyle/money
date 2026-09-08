import { OVERVIEWS } from '@/constants';
import type { Holding } from '@/types';

import * as Components from './components';

type Props = {
  date: string;
  items: Holding[];
};

export default function Credit({ date, items }: Props) {
  const filtered = items.filter(item => item.type === 'credit_card');

  if (filtered.length === 0) {
    return null;
  }

  const value = filtered.reduce((accumulator, item) => {
    return accumulator - Number(item.balance);
  }, 0);

  return (
    <Components.Item>
      <Components.ItemHeading>Credit Cards</Components.ItemHeading>
      <Components.ItemContent>
        <Components.ItemContentAmount isNegative>{value}</Components.ItemContentAmount>
        <Components.ItemContentDate>{date}</Components.ItemContentDate>
      </Components.ItemContent>
      <Components.ItemFooter>
        <Components.ItemFooterAnchor>
          {OVERVIEWS.creditCardAccounts}
        </Components.ItemFooterAnchor>
      </Components.ItemFooter>
    </Components.Item>
  );
};
