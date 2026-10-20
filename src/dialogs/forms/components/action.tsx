'use client';

import { NAVIGATION_RADIUS } from '@/constants';
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
          isSubmit && styles.submit,
          isOutline && styles.outline,
          !isOutline && !isSubmit && styles.basic,
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
    py-2.5
    text-sm text-(--background)
    uppercase
    font-medium
    tracking-wide
    select-none

    motion-safe:duration-300

    disabled:opacity-50
    disabled:!cursor-not-allowed

    md:text-tiny
    md:py-2

    ${NAVIGATION_RADIUS}
  `,
  basic: `
    bg-(--foreground)
    border border-(--background)
  `,
  submit: `
    bg-yellow-300
    !text-black
    border border-current/12
  `,
  outline: `
    !bg-transparent
    !text-(--foreground)
    border border-current/12
  `,
});
