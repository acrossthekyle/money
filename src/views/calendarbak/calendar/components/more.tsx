import tw from '@/styles';

type Props = {
  count: number;
  isFaded: boolean;
  onClick: (useModal: boolean) => void;
};

type ContainerProps = {
  classNames: string;
  onClick: (useModal: boolean) => void;
};

function Container({
  children,
  classNames,
  onClick,
}: React.PropsWithChildren<ContainerProps>) {
  return (
    <>
      <button
        className={[classNames, styles.modal].join(' ')}
        onClick={() => onClick(true)}
        title="View all budgets"
        type="button"
      >
        {children}
      </button>
      <button
        className={[classNames, styles.list].join(' ')}
        onClick={() => onClick(false)}
        title="View all budgets"
        type="button"
      >
        {children}
      </button>
    </>
  );
}

export default function More({
  count,
  isFaded,
  onClick,
}: Props) {
  const classNames = [
    styles.container,
    isFaded && styles.faded,
    count <= 0 && styles.hidden,
  ].filter(Boolean).join(' ');

  return (
    <Container classNames={classNames} onClick={onClick}>
      {count > 0 && (
        <span className={styles.text}>
          +{count} <span className={styles.label}>more</span>
        </span>
      )}
    </Container>
  );
};

const styles = tw({
  container: `
    absolute inset-0 z-100
    items-end
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
    px-3 pb-2
    font-normal font-mono

    md:p-0
  `,
  label: `
    hidden

    xs:block
  `,
  hidden: `
    md:hidden
  `,
  modal: `
    hidden

    md:flex
  `,
  list: `
    flex

    md:hidden
  `,
});
