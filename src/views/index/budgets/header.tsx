import tw from '@/styles';

type Props = {
  onAdd: () => void;
};

export default function Header({ onAdd }: Props) {
  return (
    <>
      <span className={styles.divider} role="presentation" />
      <h3 className={styles.container}>
        <span>Budgets</span>
        <button className={styles.cta} onClick={onAdd} type="button">
          Add
        </button>
      </h3>
    </>
  );
};

const styles = tw({
  container: `
    relative
    flex items-center justify-between
    w-full
    font-roboto font-bold
    text-sm
    uppercase
  `,
  cta: `
    flex items-center gap-2
    py-1 px-2
    font-roboto
    uppercase
    text-xs
    border border-current/62.5
    rounded-sm
    tracking-wide

    motion-safe:duration-300

    hover:border-current/90

    md:text-tiny
  `,
  divider: `
    h-px w-full
    my-4
    border-b border-dashed border-current/62.5
  `,
});
