import tw from '@/styles';
import { authentication } from '@/utils/authentication';

import Logo from './logo';
import Logout from './logout';
import Navigation from './navigation';
import Theme from './theme';

export default async function Header() {
  const { isAuthenticated } = await authentication();

  return (
    <header className={styles.container(isAuthenticated)}>
      <Logo />
      <Navigation isAuthenticated={isAuthenticated} />
      <Theme />
      <Logout isAuthenticated={isAuthenticated} />
    </header>
  );
};

const styles = {
  container: (isAuthenticated: boolean) => tw(`
    flex flex-col items-center
    ${isAuthenticated ? 'h-19' : 'h-11'}
    border-b border-current/10

    md:flex-row
    md:h-auto
    md:p-2
  `),
};
