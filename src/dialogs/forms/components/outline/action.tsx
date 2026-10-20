'use client';

import { LIST_ITEM_EDIT_RADIUS } from '@/constants';
import tw from '@/styles';

type Props = {
  onClick: () => void;
};

export default function Action({
  children,
  onClick,
}: React.PropsWithChildren<Props>) {
  return (
    <button className={styles.container} onClick={onClick} type="button">
      {children}
      <span className={styles.text}>Edit</span>
    </button>
  );
};

const styles = tw({
  container: `
    flex flex-col gap-1
    w-full
    text-left
  `,
  text: `
    absolute right-0 top-1/2
    -translate-y-1/2
    py-2.5 px-4
    text-xs
    uppercase
    tracking-wide
    font-roboto
    border border-current/16

    md:text-tiny
    md:py-1.5
    md:px-2.5

    ${LIST_ITEM_EDIT_RADIUS}
  `,
});
