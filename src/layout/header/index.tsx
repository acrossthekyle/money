import tw from '@/styles';

import Theme from './theme';
import Toggle from './toggle';

type Props = {
  isAuthenticated?: boolean;
};

export default function Header({ isAuthenticated = true }: Props) {
  return (
    <header className={styles.container}>
      {isAuthenticated && (
        <Toggle />
      )}
      <Theme />
    </header>
  );
};

const styles = tw({
  container: `
    flex items-center justify-between
    w-[calc(100%-1rem)] max-w-100
    mx-auto
    mt-2 px-2 py-1

    bg-zinc-50
    border border-current/7.5
    rounded-2xl

    dark:bg-neutral-900

    sm:border-0
    sm:bg-transparent
    sm:fixed
    sm:left-2
    sm:right-2
    sm:top-4
    sm:z-0
    sm:max-w-none
    sm:mx-none
    sm:w-auto
    sm:mt-0
    sm:py-0

    sm:dark:bg-transparent
  `,
});
