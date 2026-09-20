'use client';

import { ChevronRight, LoaderCircle } from 'lucide-react';

import tw, { cs } from '@/styles';
import type { Holding } from '@/types';
import Ui from '@/ui';
import { currency } from '@/utils';

import { useModel } from './model';

type Props = {
  holding: Holding;
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
  } = useModel(holding);

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
              <button
                className={styles.item}
                onClick={() => handleOnClick(item)}
                type="button"
              >
                <h3 className={styles.heading}>
                  <span className={styles.title}>
                    {item.name}
                    {item.id === holding.id && (
                      <span className={styles.badge}>Selected</span>
                    )}
                  </span>
                  <span className={styles.lid}>
                    {!!item.institution && `${item.institution} • `}
                    {item.type.replace(/_/g, ' ')}
                    {item.number && ` . . . ${item.number}`}
                  </span>
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
                  <ChevronRight className={styles.icon} />
                )}
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
    pb-4
    h-full
    divide-y divide-current/7.5
  `,
  header: `
    text-base
    font-bold

    md:text-sm
  `,
  item: `
    group
    relative
    flex items-center justify-between
    w-full
    mb-4
    text-base text-left
    leading-[1.25]

    motion-safe:before:duration-300

    before:absolute
    before:top-0
    before:-left-6
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
    flex items-center gap-3
    font-medium
    leading-[1]
  `,
  badge: `
    inline-block
    px-2 py-1
    text-xtiny
    uppercase
    bg-(--foreground)
    text-(--background)
    rounded-full
    tracking-wide
  `,
  lid: `
    text-tiny text-current/75
    uppercase
  `,
  currency: `
    text-sm
    font-roboto font-normal

    md:text-xs
  `,
  negative: `
    text-red-400 dark:text-rose-400
  `,
})
