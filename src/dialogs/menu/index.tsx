'use client';

import { ClockFading, LayoutList, LogOut, Moon, Sun } from 'lucide-react';
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
        <Ui.Dialog.DialogHeader onClose={onClose}>
          Menu
        </Ui.Dialog.DialogHeader>
        <ul className={styles.items}>
          <li>
            <Link
              className={cs(styles.item, styles.hoverable)}
              onClick={onClose}
              href="/"
            >
              <LayoutList className={styles.icon} />
              <span className={styles.value}>
                Dashboard
              </span>
            </Link>
          </li>
          <li>
            <Link
              className={cs(styles.item, styles.hoverable)}
              onClick={onClose}
              href="/budgets"
            >
              <ClockFading className={styles.icon} />
              <span className={styles.value}>
                Budgets
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
                {theme === 'dark' ? (
                  <Sun className={styles.icon} />
                ) : (
                  <Moon className={styles.icon} />
                )}
                <span className={styles.value}>
                  {theme === 'dark' ? 'light' : 'dark'} Mode
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
                <LogOut className={styles.icon} />
                <span className={styles.value}>
                  Logout
                </span>
              </button>
            </form>
          </li>
          <li className={styles.divider} role="presentation" />
          <li className={cs(styles.item, styles.static)}>
            <span className={styles.label}>
              Net Worth
            </span>
            <span className={cs(styles.value, styles.info)}>
              ${currency(netWorth)}
            </span>
          </li>
          <li className={cs(styles.item, styles.static)}>
            <span className={styles.label}>
              Timezone
            </span>
            <span className={cs(styles.value, styles.info)}>
              {zone}
            </span>
          </li>
        </ul>
      </Ui.Dialog.DialogInner>
    </Ui.Dialog.Dialog>
  );
};

const styles = tw({
  items: `
    grid grid-cols-2 gap-4
    mt-4
  `,
  item: `
    relative
    flex flex-col justify-between
    w-full h-28
    text-base text-left
    rounded-md
    p-3

    md:p-4
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
    text-sm
    tracking-wide
    scale-100
    origin-bottom-left

    md:text-xs
  `,
  info: `
    text-sm

    md:text-xs
  `,
  label: `
    uppercase
    text-xs
    font-medium
  `,
  icon: `
    w-5 h-5
    stroke-2

    md:w-4
    md:h-4
  `,
  divider: `
    col-span-2
    mt-0.25 dark:mt-0.5
    h-px
    w-full
    border-t border-dashed border-current/62.5
  `,
});
