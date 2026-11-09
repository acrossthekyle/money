import { ReactNode } from 'react';

import { Main } from '@/layout';

export default function Layout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Main>
      {children}
    </Main>
  );
}
