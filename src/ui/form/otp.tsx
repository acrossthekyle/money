'use client';

import tw from '@/styles';

type Props = {
  index: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onPaste: (event: React.ClipboardEvent<HTMLInputElement>) => void;
  onRef: (element: HTMLInputElement) => void;
  value: string;
};

export default function Otp({
  index,
  onChange,
  onKeyDown,
  onPaste,
  onRef,
  value,
}: Props) {
  return (
    <div className={styles.field}>
      <input
        aria-label={`character ${index + 1} of 6`}
        autoComplete="one-time-code"
        autoCorrect="off"
        className={styles.input}
        inputMode="numeric"
        maxLength={6}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onPaste={onPaste}
        pattern="\d{1}"
        ref={onRef}
        required
        spellCheck="false"
        type="text"
        value={value}
      />
    </div>
  );
};

const styles = tw({
  field: `
    w-fit
  `,
  input: `
    appearance-none
    h-8 w-8
    bg-(--foreground)/5.5
    border border-(--foreground)/10.5
    outline-3 outline-transparent
    text-center
    rounded-lg

    motion-safe:duration-300

    focus:border-(--foreground)/62.5
    focus:outline-(--foreground)/32.5

    lg:text-sm
  `,
});
