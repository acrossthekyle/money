'use client';

import { useHoldings } from '@/hooks';
import tw from '@/styles';
import type { Holding } from '@/types';
import Ui from '@/ui';

import Item from './item';

type Props = {
  holding: Holding;
  holdings: Holding[];
};

export default function Dialog({ holding, holdings }: Props) {
  const { instance, isActive, onBackdrop, onCancel } = useHoldings();

  return (
    <Ui.Dialog.Dialog
      id="holdings-dialog"
      instance={instance}
      isActive={isActive}
      onBackdrop={onBackdrop}
      onCancel={onCancel}
    >
      <div className={styles.container(isActive)}>
        <h2 className="hidden" id="dialog-header">Accounts/assets</h2>
        <ul className={styles.items}>
          {holdings.map((item) => (
            <li key={item.id}>
              <Item holding={item} isActive={item.id === holding.id} />
            </li>
          ))}
        </ul>
      </div>
    </Ui.Dialog.Dialog>
  );
};

const styles = tw({
  container: (isActive: boolean) => tw(`
    absolute top-4 left-4 bottom-8 right-4
    p-4
    bg-(--background)
    border border-current/5.5 dark:border-current/17.5
    rounded-xl
    shadow-lg/12.5 dark:shadow-lg/75
    overflow-y-auto

    motion-safe:duration-300

    ${isActive ? `opacity-100 translate-x-0` : `opacity-0 -translate-x-8`}

    md:w-100
    md:right-auto
    md:bottom-4
  `),
  items: `
    flex flex-col gap-4
    pb-4
    h-full
    divide-y divide-current/7.5 dark:divide-current/17.5
  `,
})
