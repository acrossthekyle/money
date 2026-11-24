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

  const mustConnect = isSynced === false && !isSyncing && !hasError && !canSync;
  const mustFinish = isSynced === true && !isSyncing && !hasError && canSync;
  const mustLink = isSynced === null && !isSyncing && !hasError && canSync;
  const mustLoad = isSynced === false && isSyncing && !hasError && canSync;
  const mustStop = isSynced === false && !isSyncing && hasError && canSync;
  const mustSync = isSynced === false && !isSyncing && !hasError && canSync;

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
              {mustConnect && (
                <TriangleExclamationPoint className={styles.icon} />
              )}
              {(mustFinish || mustLink) && (
                <Check className={styles.icon} />
              )}
              {mustLoad && (
                <LoaderCircle className={cs(styles.icon, styles.spin)} />
              )}
              {mustStop && (
                <TriangleExclamationPoint className={styles.icon} />
              )}
              {mustSync && (
                <Clock className={styles.icon} />
              )}
            </div>
            <h2 className={styles.header}>
              {mustConnect && 'Connection Required'}
              {mustFinish && 'Synced'}
              {mustLink && 'Semi-Synced'}
              {mustLoad && 'Syncing...'}
              {mustStop && 'Error'}
              {mustSync && 'Out of Sync'}
            </h2>
            <p className={styles.paragraph}>
              {mustConnect && 'The balances of one or more accounts are not connected to the financial institution.'}
              {mustFinish && 'The balances from the financial insitution have been successfully synced.'}
              {mustLink && 'The balances from the financial insitution need to be linked with your portfolio.'}
              {mustLoad && 'Retrieving balances from financial institution, one moment please.'}
              {mustStop && 'Something went wrong syncing the balances, please try again.'}
              {mustSync && 'The balances of one or more accounts were synced more than one day ago.'}
            </p>
            <div className={styles.footer}>
              <div className={styles.action}>
                <Ui.Components.Button
                  isDisabled={mustLoad}
                  isPrimary
                  isSquared
                  onClick={handleOnConfirm}
                >
                  {mustConnect && 'Connect'}
                  {mustFinish && 'Done'}
                  {mustLink && 'Link Balances'}
                  {mustLoad && 'Processing...'}
                  {(mustStop || mustSync) && 'Sync Balances'}
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
