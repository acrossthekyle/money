import { ASSETS, OVERVIEWS } from '@/constants';
import type { Holding } from '@/types';

import * as Components from './components';

type Props = {
  date: string;
  items: Holding[];
};

export default function Other({ date, items }: Props) {
  const filtered = items.filter(item => ASSETS.includes(item.type))
    .filter(item => item.type !== 'retirement');

  if (filtered.length === 0) {
    return null;
  }

  const value = filtered.reduce((accumulator, item) => {
    return accumulator + Number(item.balance);
  }, 0);

  return (
    <Components.Item>
      <Components.ItemHeading>All Other Assets</Components.ItemHeading>
      <Components.ItemContent>
        <Components.ItemContentAmount>{value}</Components.ItemContentAmount>
        <Components.ItemContentDate>{date}</Components.ItemContentDate>
      </Components.ItemContent>
      <Components.ItemFooter>
        <Components.ItemFooterAnchor>
          {OVERVIEWS.allOtherAssets}
        </Components.ItemFooterAnchor>
      </Components.ItemFooter>
    </Components.Item>
  );
};
