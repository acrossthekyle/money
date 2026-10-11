import tw from '@/styles';
import { Ui } from '@/ui';
import { authentication } from '@/utils/authentication';

import Anchor from './anchor';
import Exit from './exit';
import Locked from './locked';
import Theme from './theme';

export default async function Header() {
  const { isAuthenticated } = await authentication();

  return (
    <header className={styles.container}>
      {isAuthenticated ? (
        <>
          <Anchor />
          <Ui.Components.Logo />
          <nav className={styles.options}>
            <Theme />
            <Exit />
          </nav>
        </>
      ) : (
        <>
          <Locked />
          <nav className={styles.options}>
            <Theme />
          </nav>
        </>
      )}
    </header>
  );
};

const styles = tw({
  container: `
    relative left-1/2
    -translate-x-1/2
    flex items-center justify-between
    w-full max-w-sm
    mt-4 mb-3
    p-3 px-6
    text-(--foreground)

    before:absolute
    before:inset-y-0
    before:inset-x-3
    before:-z-1
    before:bg-(--foreground)/2
    before:border
    before:border-current/6
    before:rounded-xl

    md:before:inset-x-6
    md:mt-6
    md:mb-6
    md:px-9
  `,
  options: `
    flex items-center gap-2
  `,
});
