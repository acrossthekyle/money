'use client';

import tw, { cs } from '@/styles';

type Props = {
  className?: string;
  isBlocked?: boolean;
  isEditing?: boolean;
  isOutline?: boolean;
  isSubmit?: boolean;
  onClick: () => void;
};

export default function Action({
  children,
  className,
  isBlocked,
  isEditing,
  isOutline,
  isSubmit,
  onClick,
}: React.PropsWithChildren<Props>) {
  return (
    <button
      className={
        cs(
          styles.container,
          className,
          isSubmit ? styles.submit : styles.basic,
          isOutline && styles.outline,
        )
      }
      disabled={isBlocked}
      onClick={onClick}
      type="button"
    >
      {isEditing ? 'Save and Review' : <>{children}</>}
    </button>
  );
};

const styles = tw({
  container: `
    flex items-center justify-center gap-2
    w-full
    border border-current/12
    rounded-full
    py-2.5
    text-sm text-(--background)
    uppercase
    font-medium
    tracking-wide

    motion-safe:duration-300

    disabled:opacity-50
    disabled:!cursor-not-allowed

    md:text-tiny
    md:rounded-lg
    md:py-2
  `,
  basic: `
    bg-(--foreground)
  `,
  submit: `
    bg-yellow-300
    !text-black
  `,
  outline: `
    !bg-transparent
    !text-(--foreground)
  `,
});
