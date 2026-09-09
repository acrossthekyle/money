import tw from '@/styles';

type Props = {
  isNegative?: boolean;
  isPositive?: boolean;
};

export default function Heading({
  children,
  isNegative = false,
  isPositive = false,
}: React.PropsWithChildren<Props>) {
  return (
    <h3
      className={[
        styles.container,
        isNegative && styles.negative,
        isPositive && styles.positive,
      ].filter(Boolean).join(' ')}
    >
      {children}
    </h3>
  );
};

const styles = tw({
  container: `
    font-medium
    text-xtiny
    uppercase
  `,
  positive: `
    text-green-900 dark:text-green-200
  `,
  negative: `
    text-red-900 dark:text-red-200
  `,
});
