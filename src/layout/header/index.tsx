import tw from '@/styles';
import { authentication } from '@/utils/authentication';

import Links from './links';
import Logout from './logout';
import Theme from './theme';

export default async function Header() {
  const { isAuthenticated } = await authentication();

  return (
    <header className={styles.container}>
      <Links isAuthenticated={isAuthenticated} />
      <div className={styles.group}>
        <Logout isAuthenticated={isAuthenticated} />
        <Theme />
      </div>
    </header>
  );
};

const styles = tw({
  container: `
    flex items-center justify-between
    px-3 py-2
    border-b border-current/12.5
  `,
  group: `
    flex items-center gap-2

    md:gap-4
  `,
});
