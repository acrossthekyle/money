'use client';

import tw from '@/styles';

type Props = {
  onClick: () => void;
};

export default function Update({ onClick }: Props) {
  return (
    <button className={styles.container} onClick={onClick} type="button">
      Edit
    </button>
  );
};

const styles = tw({
  container: `
    absolute top-4 right-4
    w-fit
    py-1.25 px-3.5
    text-center
    whitespace-nowrap
    select-none
    text-(--foreground)
    bg-(--foreground)/4.5
    border border-current/10.5
    rounded-lg

    motion-safe:duration-300

    hover:bg-(--foreground)/7.5

    sm:text-sm
  `,
});
