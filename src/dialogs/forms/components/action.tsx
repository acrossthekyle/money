'use client';

import tw, { cs } from '@/styles';

type Props = {
  className?: string;
  isBlocked?: boolean;
  isEditing?: boolean;
  isSubmit?: boolean;
  onClick: () => void;
};

export default function Action({
  children,
  className,
  isBlocked,
  isEditing,
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
    py-2
    text-sm text-black
    uppercase
    font-normal
    tracking-wide

    motion-safe:duration-300

    disabled:opacity-50
    disabled:!cursor-not-allowed

    md:text-tiny
    md:font-medium
    md:rounded-lg
  `,
  basic: `
    bg-white
  `,
  submit: `
    bg-lime-300
  `,
});
