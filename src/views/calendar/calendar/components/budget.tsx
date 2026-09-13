import tw from '@/styles';

type Props = {
  isFaded: boolean;
  onClick?: () => void;
  type: string;
};

export default function Budget({
  children,
  isFaded,
  onClick,
  type,
}: React.PropsWithChildren<Props>) {
  return (
    <li>
      {onClick ? (
        <button
          className={[
            styles.content,
            styles.clickable,
            isFaded && styles.faded,
            type === 'credit' ? styles.credit : styles.debit,
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
    text-xtiny
    font-light

    md:text-tiny
    lg:text-xs
  `,
  clickable: `
    rounded-full
    pl-2.5 pr-1.75 py-1.25
    leading-[1]
    text-(--foreground) dark:text-(--background)
    border border-current/22.5

    motion-safe:duration-300

    hover:border-current/62.5
  `,
  static: `
    px-0.5 py-1.25
    leading-[1]
    text-(--foreground)

    md:py-0
  `,
  faded: `
    opacity-33
    pointer-events-none
  `,
  credit: `
    bg-teal-200

    md:bg-teal-200
  `,
  debit: `
    bg-rose-200

    md:bg-red-200
  `,
});
