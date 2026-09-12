'use client';

import tw from '@/styles';

type Props = {
  id: string;
  instance: (node: HTMLDialogElement | null) => void;
  isActive: boolean;
  onBackdrop: (event: React.MouseEvent<HTMLDialogElement>) => void;
  onCancel: (event: React.KeyboardEvent<HTMLDialogElement>) => void;
};

export default function Dialog({
  children,
  id,
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
      id={id}
      onClick={onBackdrop}
      ref={instance}
      onCancel={onCancel}
    >
      {children}
    </dialog>
  );
}

const styles = tw({
  container: `
    fixed inset-0
    w-full max-w-full
    h-full max-h-none
    flex flex-col items-center
    p-4 pb-2
    bg-transparent
    outline-none
    overflow-y-auto

    backdrop:hidden

    motion-safe:backdrop:opacity-0
    motion-safe:backdrop:transition-opacity
    motion-safe:backdrop:duration-450
  `,
});
