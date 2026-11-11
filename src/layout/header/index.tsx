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
    fixed left-0 right-0 top-0 z-10
    flex items-center justify-between

    sm:left-2
    sm:right-2
    sm:top-2
  `,
});
