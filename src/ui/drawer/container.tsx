'use client';

import tw, { cs } from '@/styles';

type Props = {
  id: string;
  instance: (node: HTMLDialogElement | null) => void;
  isActive: boolean;
  onBackdrop: (event: React.MouseEvent<HTMLDialogElement>) => void;
  onCancel: (event: React.KeyboardEvent<HTMLDialogElement>) => void;
};

export default function Container({
  children,
  id,
  instance,
  isActive,
  onBackdrop,
  onCancel,
}: React.PropsWithChildren<Props>) {
  return (
    <dialog
      aria-labelledby="drawer-header"
      className={cs(styles.container, isActive && 'is-active')}
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
    flex justify-end
    w-full max-w-full
    h-full max-h-none
    bg-(--background)/32.5
    outline-none
    overflow-hidden
    backdrop-blur-sm

    backdrop:hidden
  `,
});
