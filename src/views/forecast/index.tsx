'use client';

import tw from '@/styles';

import Balances from './balances';
import Calendar from './calendar';
import Flow from './flow';
import Header from './header';
import Projection from './projection';
import Upcoming from './upcoming';

import { useModel } from './model';

type Props = {
  isDemo: boolean;
};

export default function View({ isDemo }: Props) {
  const { date, days, holding, months } = useModel();

  if (date === null || !holding) {
    return null;
  }

  return (
    <div className={styles.container}>
      <Header days={days} holding={holding} isDemo={isDemo} />
      <Calendar date={date} days={days} />
      <Balances days={days} />
      <Flow months={months} />
      <Upcoming days={days} />
      <Projection months={months} />
    </div>
  );
};

const styles = tw({
  container: `
    flex flex-col gap-4
    p-4

    xs:px-0
  `,
});
