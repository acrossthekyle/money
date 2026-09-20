'use client';

import { ChevronRight, LoaderCircle, X } from 'lucide-react';

import tw, { cs } from '@/styles';
import type { Holding } from '@/types';
import Ui from '@/ui';
import { currency } from '@/utils';

import { useModel } from './model';

type Props = {
  holding?: Holding;
  holdings: Holding[];
};

export default function Dialog({ holding, holdings }: Props) {
  const {
    handleOnClick,
    instance,
    isActive,
    loadingHash,
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
          {holdings.map((item) => {
            const isCurrent = item.id === holding?.id;

            return (
              <li key={item.id}>
                <button
                  className={styles.item}
                  disabled={item.id === holding?.id}
                  onClick={() => handleOnClick(item)}
                  type="button"
                >
                  <h3
                    className={cs(styles.heading, isCurrent && styles.faded)}
                  >
                    <span className={styles.title}>{item.name}</span>
                    <span
                      className={
                        cs(
                          styles.currency,
                          Number(item.balance) < 0 && styles.negative,
                        )
                      }
                    >
                      {Number(item.balance) < 0 && '-'}
                      ${currency(item.balance)}
                    </span>
                  </h3>
                  {loadingHash === item.id ? (
                    <LoaderCircle className={cs(styles.icon, styles.spin)} />
                  ) : (
                    <ChevronRight
                      className={cs(styles.icon, isCurrent && styles.faded)}
                    />
                  )}
                </button>
              </li>
            );
          })}
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

    motion-safe:duration-300

    ${isActive ? `opacity-100 translate-x-0` : `opacity-0 -translate-x-8`}

    md:w-100
    md:right-auto
    md:bottom-4
  `),
  close: `
    absolute top-2 right-2
    p-2
  `,
  icon: `
    w-4 h-4
    stroke-2
  `,
  spin: `
    animate-spin
    mr-1
  `,
  items: `
    flex flex-col gap-4
    h-[calc(100%-3.5rem)]
    overflow-y-auto
  `,
  header: `
    pb-4 mb-4
    text-base
    font-bold
    border-b border-current/7.5 dark:border-current/17.5

    md:text-sm
  `,
  item: `
    group
    relative
    flex items-center justify-between
    w-full
    text-base text-left
    leading-[1.25]

    motion-safe:before:duration-300

    before:absolute
    before:top-0
    before:-left-2
    before:bottom-0
    before:w-1
    before:rounded-md
    before:bg-(--foreground)/22.5
    dark:before:bg-(--foreground)/100

    enabled:hover:before:left-0

    md:text-sm
  `,
  heading: `
    flex flex-col gap-1

    motion-safe:duration-300

    group-enabled:group-hover:translate-x-3
  `,
  title: `
    font-medium
    leading-[1]
  `,
  currency: `
    text-sm
    font-roboto font-medium

    md:text-xs
  `,
  negative: `
    text-red-400 dark:text-rose-400
  `,
  faded: `
    stroke-current/50
    !text-current/25
  `,
});
