import tw from '@/styles';

type Props = {
  isFaded: boolean;
  onClick?: () => void;
};

export default function Budget({ children, isFaded, onClick }: React.PropsWithChildren<Props>) {
  return (
    <li>
      {onClick ? (
        <button
          className={[
            styles.container,
            styles.clickable,
            isFaded && styles.faded,
          ].filter(Boolean).join(' ')}
          onClick={onClick}
          type="button"
        >
          {children}
        </button>
      ) : (
        <span
          className={[
            styles.container,
            styles.static,
            isFaded && styles.faded,
          ].filter(Boolean).join(' ')}
        >
          {children}
        </span>
      )}
    </li>
  );
};

const styles = tw({
  container: `
    flex items-center justify-between
    w-full
    px-1.5
    text-tiny

    md:text-xs
    xl:text-sm
  `,
  clickable: `
    rounded-lg
    py-0.75
    leading-[1]

    md:border
    md:border-current/22.5
    md:bg-(--background)

    motion-safe:duration-300

    hover:border-current/62.5
  `,
  static: `
    md:bg-transparent
  `,
  faded: `
    opacity-33
    pointer-events-none
  `,
});
