'use client';

import tw from '@/styles';

import Calendar from './calendar';
import Balances from './balances';
import Header from './header';
import Upcoming from './upcoming';

import { useModel } from './model';

export default function View() {
  const { date, days, holding, pinned } = useModel();

  if (date === null || !holding) {
    return null;
  }

  return (
    <div className={styles.container}>
      <Header holding={holding} pinned={pinned} />
      <Calendar date={date} days={days} />
      <Balances days={days} />
      <Upcoming days={days} />
    </div>
  );
};

const styles = tw({
  container: `
    p-4
    rounded-2xl
    bg-zinc-50
    border border-current/7.5

    dark:bg-neutral-900
  `,
});
