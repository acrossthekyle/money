'use client';

import { ClockFading, DoorOpen, Landmark, Moon, PiggyBank, Plus, Sun, X } from 'lucide-react';
import Link from 'next/link';

import { logout } from '@/actions/auth/logout';
import tw, { cs } from '@/styles';
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
            <Link
              className={cs(styles.item, styles.hoverable)}
              onClick={onClose}
              href="/holding"
            >
              <Ui.Components.Icon>
                <Plus className={styles.icon} />
              </Ui.Components.Icon>
              <span className={styles.value}>
                Create Account/Asset
              </span>
            </Link>
          </li>
          <li>
            <Link
              className={cs(styles.item, styles.hoverable)}
              onClick={onClose}
              href="/"
            >
              <Ui.Components.Icon>
                <Landmark className={styles.icon} />
              </Ui.Components.Icon>
              <span className={styles.value}>
                View Accounts/Assets
              </span>
            </Link>
          </li>
          {isMounted && (
            <li>
              <button
                className={cs(styles.item, styles.hoverable)}
                onClick={handleOnTheme}
                type="button"
              >
                <Ui.Components.Icon>
                  {theme === 'dark' ? (
                    <Sun className={styles.icon} />
                  ) : (
                    <Moon className={styles.icon} />
                  )}
                </Ui.Components.Icon>
                <span className={styles.value}>
                  Switch to<br />{theme === 'dark' ? 'light' : 'dark'} Mode
                </span>
              </button>
            </li>
          )}
          <li>
            <form action={logout}>
              <button
                className={cs(styles.item, styles.hoverable)}
                onClick={onClose}
                type="submit"
              >
                <Ui.Components.Icon>
                  <DoorOpen className={styles.icon} />
                </Ui.Components.Icon>
                <span className={styles.value}>
                  Logout and<br />
                  end session
                </span>
              </button>
            </form>
          </li>
          <li className={styles.divider} role="presentation" />
          <li className={cs(styles.item, styles.static)}>
            <Ui.Components.Icon>
              <PiggyBank className={styles.icon} />
            </Ui.Components.Icon>
            <span className={styles.value}>
              ${currency(netWorth)}<br />
              Net Worth
            </span>
          </li>
          <li className={cs(styles.item, styles.static)}>
            <Ui.Components.Icon>
              <ClockFading className={styles.icon} />
            </Ui.Components.Icon>
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
    p-2

    xs:p-4
    md:text-sm
    md:h-26
  `,
  static: `
    border border-dashed border-current/62.5
  `,
  hoverable: `
    bg-(--foreground)
    text-(--background)

    motion-safe:duration-300

    hover:bg-(--background)
    hover:text-(--foreground)
  `,
  value: `
    flex items-center justify-between
    w-full
    uppercase
    text-xs
    font-bold
    tracking-wide
    scale-100
    origin-bottom-left

    xs:scale-105
    sm:scale-100
    sm:text-xs
  `,
  icon: `
    w-3 h-3
    stroke-2
  `,
  divider: `
    col-span-2
    mt-0.25 dark:mt-0.5
    h-px
    w-full
    border-t border-dashed border-current/62.5
  `,
});
