'use client';

import tw from '@/styles';

import { useModel } from './model';

export default function Theme() {
  const { handleOnTheme, isMounted, theme } = useModel();

  if (!isMounted) {
    return null;
  }

  return (
    <div className={styles.container}>
      <span className={styles.prefix}>Lights</span>
      <label className={styles.label}>
        <input
          checked={theme === 'light'}
          className={styles.checkbox}
          onChange={handleOnTheme}
          type="checkbox"
        />
        <div className={styles.bar} />
        <span className={styles.circle} />
      </label>
    </div>
  );
};

const styles = tw({
  container: `
    flex flex-wrap items-center justify-center space-x-2.5
  `,
  prefix: `
    text-sm text-current/92.5
  `,
  label: `
    relative
    inline-flex items-center gap-2.5
    cursor-pointer
    capitalize
    outline outline-(--foreground)/92.5
    rounded-full
  `,
  checkbox: `
    peer
    sr-only
  `,
  bar: `
    w-7 h-3.75
    bg-(--background)
    rounded-full

    motion-safe:transition-colors
    motion-safe:duration-200
  `,
  circle: `
    absolute left-0.5 top-0.5
    w-2.75 h-2.75
    bg-(--foreground)/92.5
    rounded-full

    motion-safe:transition-transform
    motion-safe:duration-200
    motion-safe:ease-in-out

    peer-checked:translate-x-3.25
  `,
});
