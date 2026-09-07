import tw from '@/styles';

type Props = {
  isFaded?: boolean;
  isNegative: boolean;
};

export default function Balance({
  children,
  isFaded,
  isNegative,
}: React.PropsWithChildren<Props>) {
  return (
    <span
      className={
        `${styles.container} ${isNegative ? styles.negative : ''} ${isFaded ? styles.faded : ''}`.trim()
      }
    >
      ${children}
    </span>
  );
};

const styles = tw({
  container: `
    absolute top-2 left-2
    text-xs
    font-mono
  `,
  negative: `
    text-red-400
  `,
  faded: `
    opacity-33
    pointer-events-none
  `,
});
