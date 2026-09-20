'use client';

import { DoorOpen, Moon, Plus, Sun, Undo2, X } from 'lucide-react';

import { logout } from '@/actions/auth/logout';
import tw, { cs } from '@/styles';
import Ui from '@/ui';
import { currency } from '@/utils';

import { useModel } from './model';

type Props = {
  netWorth: number;
  onAdd: () => void;
};

export default function Dialog({
  netWorth,
  onAdd,
}: Props) {
  const {
    handleOnCreate,
    handleOnReset,
    handleOnTheme,
    instance,
    isActive,
    isMounted,
    onBackdrop,
    onCancel,
    onClose,
    theme,
    zone,
  } = useModel(onAdd);

  return (
    <Ui.Dialog.Dialog
      id="menu-dialog"
      instance={instance}
      isActive={isActive}
      onBackdrop={onBackdrop}
      onCancel={onCancel}
    >
      <h2 className="hidden" id="dialog-header">Options</h2>
      <div className={styles.container(isActive)}>
        <button className={styles.close} onClick={onClose} type="button">
          <X className={styles.icon} />
        </button>
        <ul className={styles.items}>
          <li className={cs(styles.item, styles.header)}>
            <h3 className={styles.heading}>Time Zone</h3>
            <p className={styles.value}>
              <span>{zone}</span>
            </p>
          </li>
          <li>
            <button className={styles.item} onClick={handleOnCreate} type="button">
              <h3 className={styles.heading}>Create</h3>
              <p className={styles.value}>
                <span>Account/asset</span>
                <Plus className={styles.icon} />
              </p>
            </button>
          </li>
          <li>
            <button className={styles.item} onClick={handleOnReset} type="button">
              <h3 className={styles.heading}>Reset</h3>
              <p className={styles.value}>
                <span>Back to today</span>
                <Undo2 className={styles.icon} />
              </p>
            </button>
          </li>
          {isMounted && (
            <li>
              <button className={styles.item} onClick={handleOnTheme} type="button">
                <h3 className={styles.heading}>Change Theme</h3>
                <p className={styles.value}>
                  <span>Current: {theme}</span>
                  {theme === 'light' ? (
                    <Moon className={styles.icon} />
                  ) : (
                    <Sun className={styles.icon} />
                  )}
                </p>
              </button>
            </li>
          )}
          <li>
            <form action={logout}>
              <button className={styles.item} onClick={onClose} type="submit">
                <h3 className={styles.heading}>Log Out</h3>
                <p className={styles.value}>
                  <span>End Session</span>
                  <DoorOpen className={styles.icon} />
                </p>
              </button>
            </form>
          </li>
          <li className={cs(styles.item, styles.footer)}>
            <h3 className={styles.heading}>Net Worth</h3>
            <p className={cs(styles.value, styles.currency)}>
              <span>${currency(netWorth)}</span>
            </p>
          </li>
        </ul>
      </div>
    </Ui.Dialog.Dialog>
  );
};

const styles = tw({
  container: (isActive: boolean) => tw(`
    absolute top-4 right-4
    w-72
    p-4
    bg-(--background)
    border border-current/5.5 dark:border-current/17.5
    rounded-xl
    shadow-lg/12.5 dark:shadow-lg/75

    motion-safe:duration-300

    ${isActive
      ? `opacity-100 translate-x-0`
      : `opacity-0 -translate-x-8`}

    md:top-6
    md:right-6
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
    pb-4
    border-b border-current/7.5 dark:border-current/17.5
  `,
  footer: `
    pt-4
    border-t border-current/7.5
  `,
  item: `
    w-full
    text-base text-left
    leading-[1.25]

    md:text-sm
  `,
  heading: `
    font-black
  `,
  value: `
    flex items-center justify-between
    w-full
    font-light
    capitalize
  `,
  currency: `
    mt-0.5
    text-sm
    font-roboto font-medium

    md:text-xs
  `,
});
