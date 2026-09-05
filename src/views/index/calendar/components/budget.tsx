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
          className={`${styles.clickable} ${isFaded ? styles.faded : ''}`.trim()}
          onClick={onClick}
          type="button"
        >
          {children}
        </button>
      ) : (
        <span
          className={`${styles.static} ${isFaded ? styles.faded : ''}`.trim()}
        >
          {children}
        </span>
      )}
    </li>
  );
};

const styles = tw({
  clickable: `
    flex items-center justify-between
    w-full
    text-sm
    border border-current/22.5
    rounded-sm
    p-1.5 py-0.75
    leading-[1]
    bg-(--background)

    motion-safe:duration-300
    motion-safe:hover:border-current/62.5
  `,
  static: `
    flex items-center justify-between
    w-full
    p-1.5 py-0
    text-sm
  `,
  faded: `
    opacity-33
    pointer-events-none
  `,
});
