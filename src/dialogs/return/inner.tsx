'use client';

import tw, { cs } from '@/styles';
import Ui from '@/ui';
import { currency } from '@/utils';

import { useModel } from './model';

export default function Inner() {
  const {
    data,
    isActive,
    onClose,
  } = useModel();

  if (!isActive || data === undefined) {
    return null;
  }

  const isNegative = !data?.day.return.isPositive;

  const value = currency(data?.day.return.amount).split('.');
  const dollars = value[0];
  const cents = value[1];

  return (
    <>
      <Ui.Dialog.DialogHeader onClose={onClose}>
        <Ui.Dialog.DialogTitle
          text={data?.day.dateable.display}
        >
          <span className={styles.lid}>
            USD • {data?.day.return.label} • {data?.holding.interest > 0 ? '+' : '-'}{data?.holding.interest}%
          </span>
        </Ui.Dialog.DialogTitle>
      </Ui.Dialog.DialogHeader>
      <Ui.Dialog.DialogContent label="return details">
        <p
          className={
            cs(
              styles.amount,
              isNegative && styles.negative,
              !isNegative && styles.positive,
            )
          }
        >
          <span className={styles.sign}>{isNegative ? '-' : '+'}</span>
          ${dollars}
          <span className={styles.cents}>
            .{cents}
          </span>
        </p>
        <p className={styles.content}>
          <span className={styles.title}>
            {['savings', 'checking', 'credit_card'].includes(data?.holding.type) && (
              <>Growth</>
            )}
            {['retirement'].includes(data?.holding.type) && (
              <>Return</>
            )}
            {['property'].includes(data?.holding.type) && (
              <>Worth</>
            )}
          </span>
          <span className={styles.footer}>
            Credit
          </span>
        </p>
        <nav className={styles.navigation}>
          <button
            className={styles.navigate}
            onClick={onClose}
            type="button"
          >
            Close
          </button>
        </nav>
      </Ui.Dialog.DialogContent>
    </>
  );
};

const styles = tw({
  lid: `
    font-roboto
    text-tiny
    uppercase
    tracking-wider
  `,
  amount: `
    relative
    flex justify-center
    w-full
    my-4
    text-center text-5xl
    font-thin
  `,
  sign: `
    pr-2
    text-3xl
    font-extralight
  `,
  cents: `
    pl-1
    text-xl
    font-light
  `,
  negative: `
    text-red-400 dark:text-rose-400
  `,
  positive: `
    text-green-500 dark:text-lime-500
  `,
  content: `
    flex flex-col items-center gap-0.5
    -mt-1
  `,
  title: `
    relative
    text-sm text-center
    uppercase
    font-normal
  `,
  footer: `
    text-xtiny text-center text-current/80
    uppercase
    tracking-wide
    font-roboto
  `,
  navigation: `
    flex justify-between gap-4
    w-full
    mt-2
  `,
  navigate: `
    flex items-center justify-center gap-3
    w-full
    border border-current/12
    rounded-lg
    px-4 py-2
    text-tiny
    uppercase
    font-medium
    tracking-wide
  `,
});
