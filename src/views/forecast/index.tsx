'use client';

import tw from '@/styles';

import Balances from './balances';
import Calendar from './calendar';
import Delete from './delete';
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
      <Delete holding={holding} />
    </div>
  );
};

const styles = tw({
  container: `
    flex flex-col gap-4
    p-4 pt-0

    xs:px-0
    md:pt-4
  `,
});
