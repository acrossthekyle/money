'use client';

import { ClockFading, DoorOpen, Landmark, Moon, PiggyBank, Plus, Sun, X } from 'lucide-react';
import Link from 'next/link';

import { logout } from '@/actions/auth/logout';
import tw from '@/styles';
import Ui from '@/ui';
import { currency } from '@/utils';

import { useModel } from './model';

type Props = {
  netWorth: number;
};

export default function Dialog({ netWorth }: Props) {
  const {
    handleOnTheme,
    instance,
    isActive,
    isMounted,
    onBackdrop,
    onCancel,
    onClose,
    theme,
    zone,
  } = useModel();

  return (
    <Ui.Dialog.Dialog
      id="menu-dialog"
      instance={instance}
      isActive={isActive}
      onBackdrop={onBackdrop}
      onCancel={onCancel}
    >
      <Ui.Dialog.DialogInner isActive={isActive}>
        <h2 className={styles.header} id="dialog-header">
          Menu
        </h2>
        <button className={styles.close} onClick={onClose} type="button">
          <X className={styles.x} />
        </button>
        <ul className={styles.items}>
          <li>
            <Link className={styles.item} onClick={onClose} href="/holding">
              <Plus className={styles.icon} />
              <span className={styles.value}>
                Create Account/Asset
              </span>
            </Link>
          </li>
          <li>
            <Link className={styles.item} onClick={onClose} href="/">
              <Landmark className={styles.icon} />
              <span className={styles.value}>
                View List of Holdings
              </span>
            </Link>
          </li>
          {isMounted && (
            <li>
              <button className={styles.item} onClick={handleOnTheme} type="button">
                {theme === 'dark' ? <Sun className={styles.icon} /> : <Moon className={styles.icon} />}
                <span className={styles.value}>
                  Switch to {theme === 'dark' ? 'light' : 'dark'} Mode
                </span>
              </button>
            </li>
          )}
          <li>
            <form action={logout}>
              <button className={styles.item} onClick={onClose} type="submit">
                <DoorOpen className={styles.icon} />
                <span className={styles.value}>
                  Logout and end session
                </span>
              </button>
            </form>
          </li>
          <li className={styles.item}>
            <PiggyBank className={styles.icon} />
            <span className={styles.value}>
              ${currency(netWorth)}<br />
              Net Worth
            </span>
          </li>
          <li className={styles.item}>
            <ClockFading className={styles.icon} />
            <span className={styles.value}>
              {zone} Timezone
            </span>
          </li>
        </ul>
      </Ui.Dialog.DialogInner>
    </Ui.Dialog.Dialog>
  );
};

const styles = tw({
  close: `
    absolute top-2 right-0 z-10
    p-2
  `,
  x: `
    w-5 h-5
    stroke-2
  `,
  header: `
    flex flex-col
    uppercase
    text-base

    md:text-sm
  `,
  items: `
    grid grid-cols-2 gap-4
    mt-6
  `,
  item: `
    relative
    flex flex-col justify-between
    w-full h-28
    text-base text-left
    rounded-md
    p-4
    bg-(--foreground)
    text-(--background)

    motion-safe:duration-300

    hover:bg-(--background)
    hover:text-(--foreground)

    md:text-sm
    md:h-26
  `,
  value: `
    flex items-center justify-between
    w-full
    uppercase
    text-sm
    font-bold
    tracking-wide

    md:text-xs
  `,
  icon: `
    w-4 h-4
    stroke-2
  `,
});
