import tw from '@/styles';

import Credit from './credit';
import Disclaimer from './disclaimer';
import Links from './links';
import Logout from './logout';
import Theme from './theme';

export default function Header() {
  return (
    <header className={styles.container}>
      <Links />
      <div className={styles.group}>
        <Disclaimer />
        <Credit />
        <Logout />
        <Theme />
      </div>
    </header>
  );
};

const styles = tw({
  container: `
    flex items-center justify-between
    h-12
    px-2
    bg-(--background)
    border-b border-current/10
    mb-4
  `,
  group: `
    flex items-center gap-1
  `,
});
