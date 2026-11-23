'use client';

import { Plus } from 'lucide-react';

import tw from '@/styles';
import Ui from '@/ui';

import { useModel } from './model';

export default function View() {
  const { handleOnAdd } = useModel();

  return (
    <div className={styles.container}>
      <Ui.Components.Card.Container>
        <div className={styles.inner}>
          <div className={styles.symbol}>
            <Plus className={styles.icon} />
          </div>
          <h1 className={styles.header}>
            Build Portfolio
          </h1>
          <p className={styles.paragraph}>
            Add your first account or asset to start planning your financial future, and more.
          </p>
          <div className={styles.action}>
            <Ui.Components.Button isPrimary isSquared onClick={handleOnAdd}>
              Create
            </Ui.Components.Button>
          </div>
        </div>
      </Ui.Components.Card.Container>
    </div>
  );
};

const styles = tw({
  container: `
    flex items-center justify-center
    h-dvh
    p-4
    text-center

    xs:px-0
  `,
  inner: `
    flex flex-col items-center justify-center gap-4
    py-4
  `,
  symbol: `
    mb-2
    p-2.5
    rounded-xl
    bg-neutral-200/62.5

    dark:bg-neutral-800/62.5
  `,
  icon: `
    size-4
    stroke-2
  `,
  header: `
    font-medium
    leading-[1]

    sm:text-sm
  `,
  paragraph: `
    w-full max-w-82
    text-current/72.5
    leading-[1.65]

    sm:text-sm
    sm:max-w-72
  `,
  action: `
    w-full max-w-43

    sm:max-w-38
  `,
});
