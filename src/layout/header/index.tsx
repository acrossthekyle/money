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
    ${isAuthenticated ? 'h-23.5 xs:h-22.5' : 'h-9'}
    ${isAuthenticated ? 'border-b' : 'border-0'}
    border-current/10

    md:flex-row
    md:h-15
    md:p-2
  `),
};
