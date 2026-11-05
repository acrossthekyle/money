'use client';

import tw from '@/styles';

import Menu from './menu';
import { useModel } from './model';
import Toggle from './toggle';

type Props = {
  isAuthenticated?: boolean;
};

export default function Header({
  children,
  isAuthenticated = true,
}: React.PropsWithChildren<Props>) {
  const { canClose, handleOnToggle, isMenuActive } = useModel();

  return (
    <>
      <header className={styles.container}>
        {isAuthenticated && (
          <Toggle canClose={canClose} onClick={handleOnToggle} />
        )}
        <div className={styles.children}>
          {children}
        </div>
      </header>
      {isAuthenticated && (
        <Menu
          isActive={isMenuActive}
          onToggle={handleOnToggle}
        />
      )}
    </>
  );
};

const styles = tw({
  container: `
    relative
    flex justify-between items-start
    w-full
    px-6 pt-6
  `,
  children: `
    flex flex-col items-end
  `,
});
