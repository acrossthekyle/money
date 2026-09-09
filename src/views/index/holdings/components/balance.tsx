import tw from '@/styles';

type Props = {
  isNegative?: boolean;
};

export default function Balance({
  children,
  isNegative = false,
}: React.PropsWithChildren<Props>) {
  return (
      <p
        className={[
          styles.container,
          isNegative && styles.negative,
        ].filter(Boolean).join(' ')}
      >
        {children}
      </p>
  );
};

const styles = tw({
  container: `
    mt-2
    font-light
    text-2xl
  `,
  negative: `
    text-red-600 dark:text-red-300
  `,
});
