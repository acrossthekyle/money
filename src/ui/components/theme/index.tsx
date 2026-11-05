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
  icon: `
    size-6
    stroke-2
  `,
});
