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
    fixed left-2 right-2 top-2
    flex items-center justify-between
  `,
});
