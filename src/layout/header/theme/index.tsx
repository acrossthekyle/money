'use client';

import { LightbulbOff, Lightbulb } from 'lucide-react';

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
        <Lightbulb className={styles.icon} />
      ) : (
        <LightbulbOff className={styles.icon} />
      )}
    </button>
  );
};

const styles = tw({
  container: `
    p-2
  `,
  icon: `
    size-5.25
    stroke-2

    sm:size-4.25
  `,
});
