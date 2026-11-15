'use client';

import tw from '@/styles';

import Calendar from './calendar';
import Balances from './balances';
import Flow from './flow';
import Header from './header';
import Projection from './projection';
import Upcoming from './upcoming';

import { useModel } from './model';

export default function View() {
  const { date, days, holding, months } = useModel();

  if (date === null || !holding) {
    return null;
  }

  return (
    <div className={styles.container}>
      <Header days={days} holding={holding} />
      <Calendar date={date} days={days} />
      <Balances days={days} />
      <Upcoming days={days} />
      <Flow months={months} />
      <Projection months={months} />
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
