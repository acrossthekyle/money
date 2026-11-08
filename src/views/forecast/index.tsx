'use client';

import Ui from '@/ui'

import Calendar from './calendar';
import Balances from './balances';
import Header from './header';

import { useModel } from './model';

export default function View() {
  const { date, days, holding } = useModel();

  if (date === null) {
    return null;
  }

  return (
    <>
      <Header holding={holding} />
      <Calendar date={date} days={days} />
      <Balances days={days} />
    </>
  );
};
