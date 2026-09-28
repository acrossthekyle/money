import { ACCOUNTS, ASSETS } from '@/constants';
import tw from '@/styles';
import type { Holding, Today } from '@/types';
import Ui from '@/ui';

import Item from './item';

type Props = {
  data: {
    date: Today;
    holdings: Holding[];
  };
};

export default function View({ data }: Props) {
  const accounts = data.holdings.filter(holding => ACCOUNTS.includes(holding.type));
  const assets = data.holdings.filter(holding => ASSETS.includes(holding.type));

  return (
    <>
      <Ui.Components.Divider />
      <Ui.Components.Header
        lid="Savings, checking, and credit cards"
        title={`Accounts (${accounts.length})`}
      />
      <Ui.Components.Divider />
      <ul className={styles.items}>
        {accounts.map((holding) => (
          <li className={styles.item} key={holding.id}>
            <Item date={data.date} holding={holding} />
          </li>
        ))}
      </ul>
      <Ui.Components.Divider />
      <Ui.Components.Header
        level={2}
        lid="Retirement or property"
        title={`Assets (${assets.length})`}
      />
      <Ui.Components.Divider />
      <ul className={styles.items}>
        {assets.map((holding) => (
          <li className={styles.item} key={holding.id}>
            <Item date={data.date} holding={holding} />
          </li>
        ))}
      </ul>
      <p className={styles.disclaimer}>
        Balances do not include budgeted events
      </p>
    </>
  );
};

const styles = tw({
  items: `
    flex flex-col gap-8
    h-full
  `,
  item: `
    relative
  `,
  disclaimer: `
    mt-8
    text-current/50
    text-xs
    uppercase
    tracking-wide
  `,
})
