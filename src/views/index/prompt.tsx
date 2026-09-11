'use client';

import tw from '@/styles';

type Props = {
  onClick: () => void;
};

export default function Prompt({ onClick }: Props) {
  return (
    <>
      <div
        aria-live="polite"
        aria-label="welcome, start here"
        className={styles.container}
      >
        <h1 className={styles.header}>[BASALT]</h1>
        <p className={styles.paragraph}>
          Click or tap the button below to get started.
        </p>
        <button className={styles.button} onClick={onClick} type="button">
          Add Account/Asset
        </button>
      </div>
    </>
  );
};

const styles = tw({
  container: `
    absolute left-1/2 top-1/2 z-200
    -translate-x-1/2 -translate-y-1/2
    flex flex-col items-center gap-4
    w-full max-w-sm
    text-sm
  `,
  header: `
    mt-2
    font-black
    uppercase
    text-xs
  `,
  paragraph: `
    leading-[1.6]
    text-center
  `,
  button: `
    flex items-center gap-2
    w-fit
    mt-2 mb-3
    bg-(--foreground)
    px-3 py-1
    rounded-full
    font-medium
    text-tiny text-(--background)
    uppercase

    motion-safe:duration-300

    hover:bg-(--foreground)/70
    hover:dark:bg-(--foreground)/80
  `,
  emphasis: `
    font-black
    italic
  `,
});
