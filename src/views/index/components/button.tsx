import tw from '@/styles';

type Props = {
  isActive?: boolean;
  isDisabled?: boolean;
  onClick: () => void;
};

export default function Button({
  children,
  isActive,
  isDisabled,
  onClick,
}: React.PropsWithChildren<Props>) {
  return (
    <button
      className={[
        styles.container,
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
    rounded-full
    bg-(--background)
    border border-current/22.5
    p-1.25 px-2

    motion-safe:duration-300

    hover:border-current/62.5
  `,
  active: `
    bg-(--background)
    text-(--foreground)
  `,
  disabled: `
    opacity-50
    !cursor-not-allowed

    hover:!border-current/22.5
  `,
});
