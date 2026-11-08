import tw from '@/styles';

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
    </header>
  );
};

const styles = tw({
  container: `
    relative left-1/2
    -translate-x-1/2
    w-full max-w-sm
    px-2
  `,
});
