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
            styles.content,
            styles.clickable,
            isFaded && styles.faded,
          ].filter(Boolean).join(' ')}
          onClick={onClick}
          title="View/Edit Budget"
          type="button"
        >
          {children}
        </button>
      ) : (
        <span
          className={[
            styles.content,
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
  content: `
    flex items-center justify-between
    w-full
    px-1.5
    font-mono
    text-xtiny

    md:text-tiny
    xl:text-xs
  `,
  clickable: `
    rounded-lg
    py-1.25
    leading-[1]

    md:border
    md:border-current/22.5
    md:bg-(--background)

    motion-safe:duration-300

    hover:border-current/62.5
  `,
  static: `
    py-1.25
    leading-[1]

    md:py-0
    md:bg-transparent
  `,
  faded: `
    opacity-33
    pointer-events-none
  `,
});
