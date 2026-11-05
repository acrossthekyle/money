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
    flex items-center justify-center
    w-fit
    py-2 px-4
    text-sm
    uppercase
    font-semibold
    select-none
    rounded-full
    border

    disabled:!cursor-not-allowed
  `,
  basic: `
    border
  `,
  submit: `
    bg-yellow-300
    text-black
  `,
  outline: `
    border
    opacity-50
  `,
});
