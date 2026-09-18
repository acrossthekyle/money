'use client';

import { ChevronRight, X } from 'lucide-react';
import Link from 'next/link';

import tw, { cs } from '@/styles';
import type { Holding } from '@/types';
import Ui from '@/ui';
import { currency } from '@/utils';

import { useModel } from './model';

type Props = {
  holdings: Holding[];
};

export default function Dialog({ holdings }: Props) {
  const {
    handleOnClick,
    instance,
    isActive,
    onBackdrop,
    onCancel,
    onClose,
  } = useModel();

  return (
    <Ui.Dialog.Dialog
      id="holdings-dialog"
      instance={instance}
      isActive={isActive}
      onBackdrop={onBackdrop}
      onCancel={onCancel}
    >
      <div className={styles.container(isActive)}>
        <h2 className={styles.header} id="dialog-header">Accounts/assets</h2>
        <button className={styles.close} onClick={onClose} type="button">
          <X className={styles.icon} />
        </button>
        <ul className={styles.items}>
          {holdings.map((holding) => (
            <li key={holding.id}>
              <button
                className={styles.item}
                onClick={() => handleOnClick(holding)}
                type="button"
              >
                <h3 className={styles.heading}>
                  <span className={styles.title}>{holding.name}</span>
                  <span className={styles.currency}>
                    ${currency(holding.balance)}
                  </span>
                </h3>
                <ChevronRight className={styles.icon} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </Ui.Dialog.Dialog>
  );
};

const styles = tw({
  container: (isActive: boolean) => tw(`
    absolute top-2 left-2 bottom-2
    w-100
    p-4
    bg-(--background)
    border border-current/5.5 dark:border-current/10
    rounded-xl
    shadow-lg/12.5 dark:shadow-lg/75

    motion-safe:duration-300

    ${isActive
      ? `opacity-100 translate-x-0`
      : `opacity-0 -translate-x-8`}
  `),
  close: `
    absolute top-2 right-2
    p-2
  `,
  icon: `
    w-4 h-4
    stroke-2
  `,
  items: `
    flex flex-col gap-4
  `,
  header: `
    pb-4 mb-4
    text-sm
    font-bold
    border-b border-current/7.5 dark:border-current/17.5
  `,
  item: `
    flex items-center justify-between
    w-full
    text-sm text-left
    leading-[1.25]
  `,
  heading: `
    flex flex-col gap-1
  `,
  title: `
    text-sm
    font-medium
    leading-[1]
  `,
  currency: `
    text-xs font-mono
  `,
});
