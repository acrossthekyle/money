import tw, { cs } from '@/styles';

type Props = {
  isDisabled?: boolean;
  isGhost?: boolean;
  isPrimary?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit';
};

export default function Button({
  children,
  isDisabled,
  isGhost,
  isPrimary,
  onClick,
  type = 'submit',
}: React.PropsWithChildren<Props>) {
  return (
    <button
      className={
        cs(
          styles.container,
          isPrimary && styles.primary,
          isGhost && styles.ghost,
        )
      }
      disabled={isDisabled}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

const styles = tw({
  container: `
    relative
    w-full
    py-1.25
    rounded-full
    text-center
    whitespace-nowrap
    select-none

    motion-safe:duration-300

    sm:text-sm
  `,
  primary: `
    bg-(--foreground)
    text-(--background)

    hover:bg-(--foreground)/90
  `,
  ghost: `
    text-(--foreground)
    bg-transparent
    border border-current/10.5

    hover:bg-(--foreground)/4.5
  `,
});
