'use client';

import tw from '@/styles';
import Ui from '@/ui';

type Props = {
  onClick: () => void;
};

export default function Update({ onClick }: Props) {
  return (
    <nav className={styles.container}>
      <Ui.Components.Button isGhost onClick={onClick}>
        Update
      </Ui.Components.Button>
    </nav>
  );
};

const styles = tw({
  container: `
    absolute top-4 right-4
  `,
});
