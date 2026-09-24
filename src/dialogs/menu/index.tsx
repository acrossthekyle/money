'use client';

import { X } from 'lucide-react';
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
    canReset,
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
  } = useModel();

  return (
    <Ui.Dialog.Dialog
      id="menu-dialog"
      instance={instance}
      isActive={isActive}
      onBackdrop={onBackdrop}
      onCancel={onCancel}
    >
      <h2 className="hidden" id="dialog-header">Options</h2>
      <Ui.Dialog.DialogInner isActive={isActive}>
        <button className={styles.close} onClick={onClose} type="button">
          <X className={styles.x} />
        </button>
        <ul className={styles.items}>
          <li className={cs(styles.item, styles.header)}>
            <h3 className={styles.heading}>Time Zone</h3>
            <p className={styles.value}>
              <span>{zone}</span>
            </p>
          </li>
          <li>
            <Link className={styles.item} onClick={onClose} href="/holding">
              <h3 className={styles.heading}>Create</h3>
              <p className={styles.value}>
                <span>Account/asset</span>
              </p>
            </Link>
          </li>
          <li>
            <Link className={styles.item} onClick={onClose} href="/">
              <h3 className={styles.heading}>Accounts/Assets</h3>
              <p className={styles.value}>
                <span>View</span>
              </p>
            </Link>
          </li>
          {canReset && (
            <li>
              <button className={styles.item} onClick={handleOnReset} type="button">
                <h3 className={styles.heading}>Reset</h3>
                <p className={styles.value}>
                  <span>Back to today</span>
                </p>
              </button>
            </li>
          )}
          {isMounted && (
            <li>
              <button className={styles.item} onClick={handleOnTheme} type="button">
                <h3 className={styles.heading}>Change Theme</h3>
                <p className={styles.value}>
                  <span>Current: {theme}</span>
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
      </Ui.Dialog.DialogInner>
    </Ui.Dialog.Dialog>
  );
};

const styles = tw({
  close: `
    absolute top-2 right-2 z-10
    p-2
  `,
  x: `
    w-5 h-5
    stroke-2
  `,
  items: `
    flex flex-col gap-4
    font-roboto
  `,
  header: `
    pb-4
    border-b border-current/7.5 dark:border-current/10.5
  `,
  footer: `
    pt-4
    border-t border-current/7.5 dark:border-current/10.5
  `,
  item: `
    relative
    flex flex-col
    w-full
    text-base text-left

    md:text-sm
  `,
  heading: `
    font-bold
    uppercase
  `,
  value: `
    flex items-center justify-between
    w-full
    uppercase
    text-sm/4
    tracking-wide

    md:text-xs
  `,
  currency: `
    mt-0.5
  `,
});
