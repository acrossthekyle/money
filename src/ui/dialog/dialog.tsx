'use client';

import tw from '@/styles';

type Props = {
  instance: (node: HTMLDialogElement | null) => void;
  isActive: boolean;
  onBackdrop: (event: React.MouseEvent<HTMLDialogElement>) => void;
  onCancel: (event: React.KeyboardEvent<HTMLDialogElement>) => void;
};

export default function Dialog({
  children,
  instance,
  isActive,
  onBackdrop,
  onCancel,
}: React.PropsWithChildren<Props>) {
  return (
    <dialog
      aria-labelledby="dialog-header"
      className={`${styles.container} ${isActive ? 'is-active' : ''}`.trim()}
      closedby="none"
      id="dialog"
      onClick={onBackdrop}
      ref={instance}
      onKeyDown={onCancel}
    >
      {children}
    </dialog>
  );
}

const styles = tw({
  container: `
    absolute
    w-full max-w-full
    h-full max-h-full
    bg-transparent
    outline-none
    overflow-hidden
    duration-450

    backdrop:absolute
    backdrop:outline-none
    backdrop:bg-(--background)/32
    backdrop:backdrop-blur-xs

    motion-safe:backdrop:opacity-0
    motion-safe:backdrop:transition-opacity
    motion-safe:backdrop:duration-450
  `,
});
