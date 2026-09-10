import tw from '@/styles';

type Props = {
  count: number;
  isFaded: boolean;
  onClick: () => void;
};

export default function More({
  count,
  isFaded,
  onClick,
}: Props) {
  return (
    <button
      className={[
        styles.container,
        isFaded && styles.faded,
        count <= 0 && styles.hidden,
      ].filter(Boolean).join(' ')}
      onClick={onClick}
      title="View all budgets"
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
    text-xtiny
    leading-[1]
    whitespace-nowrap

    md:top-auto
    md:left-0
    md:right-0
    md:bottom-0
    md:p-2
    md:text-tiny
    xl:text-xs
  `,
  faded: `
    opacity-33
    pointer-events-none
  `,
  text: `
    flex items-center gap-1
    px-2 pb-2
    font-bold font-mono

    md:font-normal
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
