'use client';

import Calendar from './calendar';
import Balances from './balances';
import Header from './header';

import { useModel } from './model';

export default function View() {
  const { date, days, holding, pinned } = useModel();

  if (date === null || !holding) {
    return null;
  }

  return (
    <>
      <Header holding={holding} pinned={pinned} />
      <Calendar date={date} days={days} />
      <Balances days={days} />
    </>
  );
};
