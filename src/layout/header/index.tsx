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
    absolute top-2 left-2 right-3
    flex items-center justify-between

    sm:top-4
    sm:left-4
    sm:right-5
    md:top-8
    md:left-8
    md:right-9
  `,
});
