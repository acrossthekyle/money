'use client';

import tw from '@/styles';

type Props = {
  isActive: boolean;
  onChange: () => void;
};

export default function Switch({
  children,
  isActive,
  onChange,
}: React.PropsWithChildren<Props>) {
  return (
    <div className={styles.container}>
      <span className={styles.text}>{children}</span>
      <label className={styles.label}>
        <input
          checked={isActive}
          className={styles.checkbox}
          onChange={onChange}
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
    flex flex-wrap items-center justify-between space-x-2.5
    w-full
  `,
  text: `
    sm:text-sm
  `,
  label: `
    relative
    inline-flex items-center gap-2.5
    cursor-pointer
    capitalize
    rounded-full
  `,
  checkbox: `
    peer
    sr-only
  `,
  bar: `
    w-9 h-5
    rounded-full

    motion-safe:duration-200

    peer-not-checked:bg-zinc-300/62.5
    peer-not-checked:dark:bg-neutral-700/62.5
    peer-checked:bg-(--foreground)
  `,
  circle: `
    absolute left-0.5 top-0.5
    w-4 h-4
    rounded-full

    motion-safe:duration-200

    peer-not-checked:bg-(--foreground)/82.5
    peer-checked:translate-x-4
    peer-checked:bg-(--background)/82.5
  `,
});
