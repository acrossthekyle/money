import { MONTHS_ABSTRACT } from '@/constants';
import tw from '@/styles';
import type { Holding } from '@/types'

type Props = {
  holding: Holding;
};

export default function Header({ holding }: Props) {
  return (
    <h1 className={styles.container}>
      <span className={styles.title}>
        {holding.name}
      </span>
      <span className={styles.lid}>
        USD • {holding.type.replace(/_/g, ' ')} • Monthly Forecast
      </span>
    </h1>
  );
};

const styles = tw({
  container: `
    flex flex-col
    mb-6
  `,
  title: `
    font-black
    text-lg
  `,
  lid: `
    font-roboto
    uppercase
    text-xs
    tracking-wide
  `,
})
