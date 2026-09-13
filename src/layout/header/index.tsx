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
    ${isAuthenticated ? 'h-20' : 'h-9'}
    border-current/10
    ${isAuthenticated ? 'border-b' : 'border-0'}

    md:flex-row
    md:h-auto
    md:p-2
  `),
};
