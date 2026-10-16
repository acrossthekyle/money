'use client';

import tw from '@/styles';

type Props = {
  onClick: () => void;
};

export default function Action({ onClick }: Props) {
  return (
    <button className={styles.container} onClick={onClick} type="button">
      Edit
    </button>
  );
};

const styles = tw({
  container: `
    absolute -right-2 -top-2
    p-2
    text-xs
    uppercase
    font-roboto
    tracking-wide

    md:text-tiny
  `,
});
