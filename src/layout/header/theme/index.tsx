'use client';

import tw from '@/styles';

import { useModel } from './model';

export default function Theme() {
  const { handleOnClick, isMounted } = useModel();

  if (!isMounted) {
    return null
  }

  return (
    <button
      className={styles.container}
      onClick={handleOnClick}
      title="Toggle theme"
      type="button"
    >
      <span className={styles.circle} />
    </button>
  );
};

const styles = tw({
  container: `
    flex items-center
    text-(--foreground)
    font-thin font-mono
    text-xtiny
    uppercase
    tracking-widest
  `,
  circle: `
    w-4 h-4
    rounded-full
    bg-(--foreground)
  `,
});
