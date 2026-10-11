'use client';

import { Moon, Sun } from 'lucide-react';

import tw from '@/styles';

import { useModel } from './model';

export default function Theme() {
  const { handleOnTheme, isMounted, theme } = useModel();

  if (!isMounted) {
    return null;
  }

  return (
    <button
      className={styles.container}
      onClick={handleOnTheme}
      title={`Switch theme to ${theme == 'dark' ? 'light' : 'dark'}`}
      type="button"
    >
      {theme === 'dark' ? (
        <Sun className={styles.icon} />
      ) : (
        <Moon className={styles.icon} />
      )}
    </button>
  );
};

const styles = tw({
  container: `
    p-2
  `,
  icon: `
    w-4.5 h-4.5
    stroke-2

    md:w-4
    md:h-4
  `,
});
