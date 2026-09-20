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
    absolute top-3 left-2 right-3.75
    flex items-center justify-between

    md:top-8
    md:left-8
    md:right-9
  `,
});
