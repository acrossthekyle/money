'use client';

import tw from '@/styles';

import MenuProvider from './context';
import { useModel } from './model';

function Inner({ children }: React.PropsWithChildren) {
  const { instance } = useModel();

  return (
    <div className={styles.container} ref={instance}>
      {children}
    </div>
  );
};

export default function Container({
  children,
}: React.PropsWithChildren) {
  return (
    <MenuProvider>
      <Inner>
        {children}
      </Inner>
    </MenuProvider>
  );
};

const styles = tw({
  container: `
    relative
  `,
});
