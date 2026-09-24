import tw from '@/styles';
import { authentication } from '@/utils/authentication';

import Logo from './logo';
import Menu from './menu';

export default async function Header() {
  const { isAuthenticated } = await authentication();

  return (
    <header className={styles.container}>
      <Logo />
      {isAuthenticated && (
        <Menu />
      )}
    </header>
  );
};

const styles = tw({
  container: `
    relative
    flex items-center justify-between
    w-full max-w-sm
    mx-auto
    pt-6 px-6 pb-4

    md:pt-12
  `,
});
