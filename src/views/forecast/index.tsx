'use client';

import Ui from '@/ui'

import Calendar from './calendar';
import Balances from './balances';
import Header from './header';
import Options from './options';

import { useModel } from './model';

export default function View() {
  const { date, days, holding, pinned } = useModel();

  if (date === null || !holding) {
    return null;
  }

  return (
    <>
      <Header holding={holding} />
      <Options holding={holding} pinned={pinned} />
      <Calendar date={date} days={days} />
      <Balances days={days} />
    </>
  );
};
