'use client';

import { Moon, Sun } from 'lucide-react';

import tw from '@/styles';

import { useModel } from './model';

export default function Theme() {
  const { handleOnClick, isMounted, resolvedTheme } = useModel();

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
      {resolvedTheme === 'light' ? (
        <Moon className={styles.icon} />
      ) : (
        <Sun className={styles.icon} />
      )}
    </button>
  );
};

const styles = tw({
  container: `
    absolute left-1.75 top-0.5
    flex items-center
    text-(--foreground)
    font-thin font-mono
    text-xtiny
    uppercase
    tracking-widest
    p-2

    md:left-auto
    md:right-2
    md:top-2.5
  `,
  icon: `
    w-4 h-4

    md:w-3.5
    md:h-3.5
  `,
});
