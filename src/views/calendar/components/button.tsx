import tw from '@/styles';

type Props = {
  className?: string;
  isActive?: boolean;
  isDisabled?: boolean;
  onClick: () => void;
};

export default function Button({
  children,
  className = '',
  isActive,
  isDisabled,
  onClick,
}: React.PropsWithChildren<Props>) {
  return (
    <button
      className={[
        styles.container,
        className,
        isActive && styles.active,
        isDisabled && styles.disabled,
      ].filter(Boolean).join(' ')}
      disabled={isDisabled}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
};

const styles = tw({
  container: `
    flex items-center gap-1
    w-fit
    rounded-full
    bg-(--background)
    border border-current/22.5
    py-1.25 px-2
    font-medium

    motion-safe:duration-300

    hover:border-current/62.5
  `,
  active: `
    bg-(--foreground)/90
    text-(--background)

    hover:bg-(--background)
    hover:text-(--foreground)
    hover:border-(--foreground)/62.5
  `,
  disabled: `
    opacity-50
    !cursor-not-allowed

    hover:!border-current/22.5
  `,
});
