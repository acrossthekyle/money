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
        <LightbulbOff className={styles.icon} />
      ) : (
        <Lightbulb className={styles.icon} />
      )}
    </button>
  );
};

const styles = tw({
  container: `
    p-2

    sm:border
    sm:border-current/7.5
    sm:rounded-lg
    sm:bg-zinc-50
    sm:dark:bg-neutral-900
  `,
  icon: `
    size-4.75
    stroke-1

    sm:size-4.25
  `,
});
