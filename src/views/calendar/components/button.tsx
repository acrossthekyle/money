import tw from '@/styles';

type Props = {
  canDim?: boolean;
  className?: string;
  isActive?: boolean;
  isDisabled?: boolean;
  onClick: () => void;
};

export default function Button({
  canDim = false,
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
        canDim && styles.dim,
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
    border border-current/17.5
    py-1.5 pl-3 pr-4
    font-medium

    motion-safe:duration-300

    hover:border-current/62.5

    md:py-1.25
  `,
  dim: `
    !cursor-default

    hover:!border-(--foreground)/17.5
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
