import { CARD_BEFORE_RADIUS } from '@/constants';
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
    w-full
    mt-4
    py-4 px-7
    text-(--foreground)

    before:absolute
    before:inset-y-0
    before:inset-x-4
    before:-z-1
    before:bg-(--foreground)/2
    before:border
    before:border-current/6

    sm:max-w-sm
    md:before:inset-x-6
    md:mt-6
    md:py-3
    md:px-9

    ${CARD_BEFORE_RADIUS}
  `,
  options: `
    flex items-center gap-2
  `,
});
