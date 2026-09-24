import { ACCOUNTS, ASSETS } from '@/constants';
import tw from '@/styles';
import type { Holding } from '@/types';
import Ui from '@/ui';

import Item from './item';

type Props = {
  data: {
    holdings: Holding[];
  };
};

export default function View({ data }: Props) {
  const accounts = data.holdings.filter(holding => ACCOUNTS.includes(holding.type));
  const assets = data.holdings.filter(holding => ASSETS.includes(holding.type));

  return (
    <>
      <Ui.Components.Divider />
      <h1 className={styles.header}>
        <span className={styles.title}>
          Accounts ({accounts.length})
        </span>
        <span className={styles.lid}>
          Savings, checking, and credit cards
        </span>
      </h1>
      <Ui.Components.Divider />
      <ul className={styles.items}>
        {accounts.map((holding) => (
          <li key={holding.id}>
            <Item holding={holding} />
          </li>
        ))}
      </ul>
      <Ui.Components.Divider />
      <h2 className={styles.header}>
        <span className={styles.title}>Assets ({assets.length})</span>
        <span className={styles.lid}>Retirement or property</span>
      </h2>
      <Ui.Components.Divider />
      <ul className={styles.items}>
        {assets.map((holding) => (
          <li key={holding.id}>
            <Item holding={holding} />
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
  container: `
    relative
    flex flex-col gap-4
    w-full max-w-sm
    mx-auto
    px-6 pt-8

    lg:pb-6
    font-roboto
  `,
  header: `
    flex flex-col
    uppercase
    text-sm
  `,
  title: `
    font-bold
  `,
  lid: `
    text-xs
  `,
  items: `
    flex flex-col gap-4
    h-full
  `,
  disclaimer: `
    mt-4
    text-current/50
    text-xs
    uppercase
    tracking-wide
  `,
})
