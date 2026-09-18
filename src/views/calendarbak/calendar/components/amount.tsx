import tw from '@/styles';
import { formatNumber } from '@/utils';

type Props = {
  value: string;
};

export default function Amount({ value }: Props) {
  return (
    <span className={styles.container}>
      ${formatNumber(Number(value))}
    </span>
  );
};

const styles = tw({
  container: `
    hidden

    lg:block
  `,
});
