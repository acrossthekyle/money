'use client';

import tw, { cs } from '@/styles';

type Props = {
  id: string;
  instance: (node: HTMLDialogElement | null) => void;
  isActive: boolean;
  isBase?: boolean;
  onBackdrop: (event: React.MouseEvent<HTMLDialogElement>) => void;
  onCancel: (event: React.KeyboardEvent<HTMLDialogElement>) => void;
};

export default function Container({
  children,
  id,
  instance,
  isActive,
  isBase = true,
  onBackdrop,
  onCancel,
}: React.PropsWithChildren<Props>) {
  return (
    <dialog
      aria-labelledby="drawer-header"
      className={cs(
        styles.container,
        isBase ? styles.baseBackdrop : styles.stackedBackdrop,
        isActive && 'is-active',
      )}
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
    fixed inset-0 z-10000
    w-full max-w-full
    h-full max-h-none
    m-0 p-0
    outline-none
    overflow-hidden
    transition-colors duration-200

    backdrop:hidden
  `,
  baseBackdrop: `
    bg-(--background)/32.5
    backdrop-blur-sm
  `,
  stackedBackdrop: `
    bg-transparent
  `,
});
