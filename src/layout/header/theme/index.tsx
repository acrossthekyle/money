'use client';

import { MoonStar, Sun } from 'lucide-react';

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
        <MoonStar className={styles.icon} />
      )}
    </button>
  );
};

const styles = tw({
  container: `
    p-2
  `,
  icon: `
    size-4.5
    stroke-2
  `,
});
