'use client';

import { Check, Clock, LoaderCircle, TriangleExclamationPoint } from 'lucide-react';

import tw, { cs } from '@/styles';
import Ui from '@/ui';

import { useModel } from './model';

type Props = {
  canSync: boolean;
};

export default function Drawer({ canSync }: Props) {
  const {
    handleOnConfirm,
    hasError,
    instance,
    isActive,
    isBase,
    isDecked,
    isSynced,
    isSyncing,
  } = useModel(canSync);

  return (
    <Ui.Drawer.Container
      id="stale-drawer"
      instance={instance}
      isActive={isActive}
      isBase={isBase}
    >
      <Ui.Drawer.Inner isCard>
        <Ui.Drawer.Content isActive={isActive} isCard isDecked={isDecked}>
          <Ui.Drawer.Body>
            <div className={styles.symbol}>
              {isSynced === false && isSyncing && (
                <LoaderCircle className={cs(styles.icon, styles.spin)} />
              )}
              {isSynced === false && !isSyncing && !hasError && canSync && (
                <Clock className={styles.icon} />
              )}
              {(isSynced === true || isSynced === null) && !isSyncing && (
                <Check className={styles.icon} />
              )}
              {isSynced === false && !isSyncing && !hasError && !canSync && (
                <TriangleExclamationPoint className={styles.icon} />
              )}
              {isSynced === false && !isSyncing && hasError && (
                <TriangleExclamationPoint className={styles.icon} />
              )}
            </div>
            {!hasError && canSync && (
              <>
                <h2 className={styles.header}>
                  {isSyncing && 'Syncing...'}
                  {(!isSyncing && isSynced === true) && 'Synced'}
                  {(!isSyncing && isSynced === null) && 'Semi-Synced'}
                  {(!isSyncing && isSynced === false) && 'Out of Sync'}
                </h2>
                <p className={styles.paragraph}>
                  {(!isSyncing && isSynced === false) && 'The balances of one or more accounts were synced more than one day ago.'}
                  {(!isSyncing && (isSynced === true || isSynced === null)) && 'The balances from the financial insitution need to be linked with your portfolio.'}
                  {(isSyncing && isSynced === false) && 'Retrieving balances from financial institution, one moment please.'}
                </p>
              </>
            )}
            {!hasError && !canSync && (
              <>
                <h2 className={styles.header}>
                  Connection Required
                </h2>
                <p className={styles.paragraph}>
                  The balances of one or more accounts are not connected to the financial institution.
                </p>
              </>
            )}
            {hasError && (
              <>
                <h2 className={styles.header}>
                  Error
                </h2>
                <p className={styles.paragraph}>
                  Something went wrong syncing the balances, please try again.
                </p>
              </>
            )}
            <div className={styles.footer}>
              <div className={styles.action}>
                <Ui.Components.Button
                  isDisabled={canSync ? isSyncing : false}
                  isPrimary
                  isSquared
                  onClick={handleOnConfirm}
                >
                  {(canSync && isSynced === false) && 'Sync Balances'}
                  {(canSync && isSynced === null) && 'Link Balances'}
                  {(canSync && isSynced === true) && 'Done'}
                  {!canSync && 'Connect'}
                </Ui.Components.Button>
              </div>
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
  spin: `
    animate-spin
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
  footer: `
    flex justify-center
    w-full
    pb-4
  `,
  action: `
    w-fit
  `,
});
