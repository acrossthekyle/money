import tw from '@/styles';
import { currency } from '@/utils';

type Props = {
  balance: string;
};

export default function Balance({ balance }: Props) {
  return (
    <p className={styles.container}>
      <span className={styles.balance}>
        ${currency(balance)}
      </span>
      <span className={styles.title}>
        Today's Baseline Balance
      </span>
    </p>
  );
};

const styles = tw({
  container: `
    relative
    flex flex-col
    pt-8
  `,
  balance: `
    text-lg
    font-roboto font-bold
  `,
  title: `
    text-tiny
    font-medium
    uppercase
  `,
});
