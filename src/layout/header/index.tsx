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
    m-4 mb-0
    h-14
    px-2
    bg-(--foreground)/2.5 dark:bg-(--foreground)/5.5
    border border-current/7.5
    rounded-lg

    md:h-12
  `,
  group: `
    flex items-center gap-2

    md:gap-4
  `,
});
