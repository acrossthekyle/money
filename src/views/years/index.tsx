'use client';

import { Footer, Header, Main } from '@/layout';
import Ui from '@/ui'

import Heading from './heading';
import Years from './years';

import { useModel } from './model';

export default function View() {
  const { active, date, years } = useModel();

  if (date === null) {
    return null;
  }

  return (
    <>
      <Header>
        <Heading years={years} />
      </Header>
      <Main>
        <Years active={active} date={date} years={years} />
      </Main>
      <Ui.Components.Divider />
      <Footer>
        <Ui.Components.Branding />
      </Footer>
    </>
  );
};
