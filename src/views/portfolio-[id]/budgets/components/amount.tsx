import tw, { cs } from '@/styles';

type Props = {
  isNegative: boolean;
};

export default function Amount({
  children,
  isNegative,
}: React.PropsWithChildren<Props>) {
  return (
    <span
      className={
        cs(
          styles.container,
          isNegative && styles.negative,
          !isNegative && styles.positive,
        )
      }
    >
      {isNegative ? '-' : '+'} {children}
    </span>
  );
};

const styles = tw({
  container: `
    whitespace-nowrap
  `,
  negative: `
    text-red-400 dark:text-rose-400
  `,
  positive: `
    text-green-500 dark:text-lime-500
  `,
});
