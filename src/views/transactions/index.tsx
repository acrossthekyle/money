'use client';

import { Footer, Header, Main } from '@/layout';
import Ui from '@/ui'

import Balance from './balance';
import Heading from './heading';
import { useModel } from './model';
import Transactions from './transactions';

export default function View() {
  const { active, day } = useModel();

  if (day === undefined) {
    return null;
  }

  return (
    <>
      <Header>
        <Heading day={day} />
      </Header>
      <Main>
        <Transactions active={active} day={day} />
      </Main>
      <Ui.Components.Divider />
      <Footer>
        <Balance day={day} />
        <Ui.Components.Branding />
      </Footer>
    </>
  );
};
