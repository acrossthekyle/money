'use client';

import { Footer, Header, Main } from '@/layout';
import Ui from '@/ui'

import Chart from './chart';
import Heading from './heading';
import Months from './months';

import { useModel } from './model';

export default function View() {
  const { active, date, months } = useModel();

  if (date === null) {
    return null;
  }

  return (
    <>
      <Header>
        <Heading active={active} date={date} />
      </Header>
      <Main>
        <Months active={active} date={date} months={months} />
      </Main>
      <Ui.Components.Divider />
      <Footer>
        <Chart months={months} />
        <Ui.Components.Branding />
      </Footer>
    </>
  );
};
