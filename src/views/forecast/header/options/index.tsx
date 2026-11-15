'use client';

import tw from '@/styles';
import Ui from '@/ui';

import { useModel } from './model';

export default function Options() {
  const { handleOnEdit } = useModel();

  return (
    <nav aria-label="options" className={styles.container}>
      <Ui.Components.Button isGhost onClick={handleOnEdit}>
        Update
      </Ui.Components.Button>
    </nav>
  );
};

const styles = tw({
  container: `
    absolute top-0 right-0
    flex flex-col justify-between items-end
  `,
});
