import tw from '@/styles';

import Theme from './theme';
import Toggle from './toggle';

export default function Header() {
  return (
    <header className={styles.container}>
      <Toggle />
      <Theme />
    </header>
  );
};

const styles = tw({
  container: `
    relative left-1/2
    -translate-x-1/2
    flex items-center justify-between
    w-full
    h-14
    mt-4
    p-4
    rounded-xl
    bg-zinc-50
    border border-current/7.5

    dark:bg-neutral-900

    xs:max-w-104
  `,
});
