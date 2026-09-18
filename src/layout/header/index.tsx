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

const styles = {
  container: `
    absolute top-8 left-8 right-9
    flex items-center justify-between
  `,
};
