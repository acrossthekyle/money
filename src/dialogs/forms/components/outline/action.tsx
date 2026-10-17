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
    absolute right-0 top-1/2
    -translate-y-1/2
    py-2.5 px-4
    text-xs
    uppercase
    tracking-wide
    font-roboto
    border border-current/16
    rounded-full

    md:text-tiny
    md:rounded-xl
    md:py-1.5
    md:px-2.5
  `,
});
