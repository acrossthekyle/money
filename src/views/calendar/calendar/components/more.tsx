import tw from '@/styles';

type Props = {
  count: number;
  isFaded: boolean;
  onClick: () => void;
};

export default function More({
  children,
  count,
  isFaded,
  onClick,
}: React.PropsWithChildren<Props>) {
  return (
    <button
      className={[
        styles.container,
        isFaded && styles.faded,
        count <= 0 && styles.hidden,
      ].filter(Boolean).join(' ')}
      onClick={onClick}
      type="button"
    >
      {count > 0 && (
        <span className={styles.text}>
          +{count} <span className={styles.label}>more</span>
        </span>
      )}
    </button>
  );
};

const styles = tw({
  container: `
    absolute inset-0 z-100
    flex items-end
    text-tiny
    leading-[1]
    whitespace-nowrap

    md:py-0.75
    md:top-auto
    md:left-2
    md:right-2
    md:bottom-2
    md:pl-0.5
    md:text-xs
    xl:text-sm
  `,
  faded: `
    opacity-33
    pointer-events-none
  `,
  text: `
    flex items-center gap-1
    px-2 pb-2

    md:p-0
  `,
  label: `
    hidden

    xs:block
  `,
  hidden: `
    md:hidden
  `,
});
