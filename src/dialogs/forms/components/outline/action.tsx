'use client';

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

    before:absolute
    before:-inset-2
    before:-z-1
    before:bg-transparent
    before:rounded-md

    motion-safe:before:duration-300

    hover:before:bg-(--foreground)/6
  `,
  text: `
    absolute -right-2 -top-2
    p-2
    text-xs
    uppercase
    font-roboto
    tracking-wide

    md:text-tiny
  `,
});
