import { ACCOUNTS, ASSETS } from '@/constants';
import tw from '@/styles';
import type { Holding, Today } from '@/types';
import Ui from '@/ui';

import Add from './add';
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
        lid="Accounts and assets"
        title="Dashboard"
      />
      <Add />
      {data.holdings.length === 0 && (
        <>
          <p className={styles.start}>
            No items found.
          </p>
        </>
      )}
      {accounts.length > 0 && (
        <>
          <Ui.Components.Divider />
          <ul className={styles.items}>
            {accounts.map((holding) => (
              <li className={styles.item} key={holding.id}>
                <Item date={data.date} holding={holding} />
              </li>
            ))}
          </ul>
        </>
      )}
      {assets.length > 0 && (
        <>
          <Ui.Components.Divider />
          <ul className={styles.items}>
            {assets.map((holding) => (
              <li className={styles.item} key={holding.id}>
                <Item date={data.date} holding={holding} />
              </li>
            ))}
          </ul>
        </>
      )}
      {data.holdings.length > 0 && (
        <p className={styles.disclaimer}>
          Balances do not include budgeted events
        </p>
      )}
    </>
  );
};

const styles = tw({
  start: `
    text-sm
    uppercase

    md:text-xs
  `,
  action: `
    inline-flex
    w-48

    md:w-42
  `,
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
    text-sm
    uppercase
    tracking-wide

    md:text-xs
  `,
  icon: `
    w-4 h-4
    stroke-2
  `,
})
