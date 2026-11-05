'use client';

import { Footer, Header, Main } from '@/layout';
import Ui from '@/ui'

import Balance from './balance';
import Chart from './chart';
import Days from './days';
import Heading from './heading';

import { useModel } from './model';

export default function View() {
  const { active, balance, date, days } = useModel();

  if (date === null) {
    return null;
  }

  return (
    <>
      <Header>
        <Heading active={active} date={date} />
      </Header>
      <Main>
        <Days days={days} />
      </Main>
      <Ui.Components.Divider />
      <Footer>
        <Balance balance={balance} />
        <Chart days={days} />
        <Ui.Components.Branding />
      </Footer>
    </>
  );
};
