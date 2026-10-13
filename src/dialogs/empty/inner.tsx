'use client';

import tw from '@/styles';
import Ui from '@/ui';

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

  return (
    <>
      <Ui.Dialog.DialogHeader onClose={onClose}>
        <Ui.Dialog.DialogTitle
          text="No Transactions"
        >
          <span className={styles.lid}>
            0 items
          </span>
        </Ui.Dialog.DialogTitle>
      </Ui.Dialog.DialogHeader>
      <Ui.Dialog.DialogContent label="no transactions details">
        <p className={styles.range}>
          {data?.range[0]} &mdash; {data?.range[1]}
        </p>
        <p className={styles.content}>
          <span className={styles.title}>
            There are no transactions within these dates.
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
  range: `
    relative
    flex justify-center
    w-full
    my-4
    text-center text-lg
    font-extralight
  `,
  content: `
    flex flex-col items-center gap-0.5
    -mt-1
  `,
  title: `
    relative
    text-sm text-center
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
