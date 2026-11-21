import tw, { cs } from '@/styles';

type Props = {
  isInline?: boolean;
  onClick?: () => void;
};

export default function Content({
  children,
  isInline,
  onClick,
}: React.PropsWithChildren<Props>) {
  if (onClick) {
    return (
      <button
        className={
          cs(
            styles.container,
            styles.hoverable,
            isInline && styles.inline,
          )
        }
        onClick={onClick}
        type="button"
      >
        {children}
      </button>
    );
  }

  return (
    <div className={cs(styles.container, isInline && styles.inline)}>
      {children}
    </div>
  );
};

const styles = tw({
  container: `
    relative
    w-full
    p-4
    rounded-xl
    bg-neutral-200/62.5
    overflow-hidden

    dark:bg-neutral-800/62.5
  `,
  hoverable: `
    text-left

    motion-safe:duration-200

    hover:bg-neutral-200
    hover:dark:bg-neutral-800
  `,
  inline: `
    flex items-center justify-between
  `,
});
