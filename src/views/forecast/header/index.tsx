import { MONTHS_ABSTRACT } from '@/constants';
import tw from '@/styles';
import type { Holding } from '@/types'

type Props = {
  holding: Holding;
};

export default function Header({ holding }: Props) {
  return (
    <h1 className={styles.container}>
      <span>
        {holding.name}
      </span>
      <span className={styles.lid}>
        Monthly Forecast
      </span>
    </h1>
  );
};

const styles = tw({
  container: `
    flex flex-col
    mb-6
    text-sm
  `,
  lid: `
    text-current/62.5
  `,
})
