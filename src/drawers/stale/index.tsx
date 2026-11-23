'use client';

import { Clock } from 'lucide-react';

import tw from '@/styles';
import Ui from '@/ui';

import { useModel } from './model';

export default function Drawer() {
  const {
    handleOnConfirm,
    instance,
    isActive,
    isBase,
    isDecked,
    onBackdrop,
    onCancel,
    onClose,
  } = useModel();

  return (
    <Ui.Drawer.Container
      id="stale-drawer"
      instance={instance}
      isActive={isActive}
      isBase={isBase}
      onBackdrop={onBackdrop}
      onCancel={onCancel}
    >
      <Ui.Drawer.Inner isCard>
        <Ui.Drawer.Content isActive={isActive} isCard isDecked={isDecked}>
          <Ui.Drawer.Body>
            <div className={styles.symbol}>
              <Clock className={styles.icon} />
            </div>
            <h2 className={styles.header}>
              Stale Data Detected
            </h2>
            <p className={styles.paragraph}>
              The balances of one or more accounts were updated more than one day ago.
            </p>
            <div className={styles.actions}>
              <Ui.Components.Button isPrimary isSquared onClick={handleOnConfirm}>
                Update Balances Now
              </Ui.Components.Button>
              <Ui.Components.Button isGhost isSquared onClick={onClose}>
                Reminder Me Later
              </Ui.Components.Button>
            </div>
          </Ui.Drawer.Body>
        </Ui.Drawer.Content>
      </Ui.Drawer.Inner>
    </Ui.Drawer.Container>
  );
};

const styles = tw({
  symbol: `
    relative left-1/2
    -translate-x-1/2
    w-fit
    mb-4 mt-4
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
    mb-4
    text-center
    font-medium
    leading-[1]

    sm:text-sm
  `,
  paragraph: `
    relative left-1/2
    -translate-x-1/2
    w-full max-w-82
    mb-8
    text-center
    text-current/72.5
    leading-[1.65]

    sm:text-sm
    sm:max-w-72
  `,
  actions: `
    flex flex-col items-center gap-3
    w-full
  `,
});
