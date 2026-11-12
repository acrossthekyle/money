import tw from '@/styles';
import type { Holding } from '@/types'

import Options from './options';

type Props = {
  holding: Holding;
  pinned: string;
};

export default function Header({ holding, pinned }: Props) {
  return (
    <div className={styles.container}>
      <h1 className={styles.header}>
        <span className={styles.name}>
          {holding.name}
        </span>
        <span className={styles.lid}>
          View transactions by date
        </span>
      </h1>
      <Options holding={holding} pinned={pinned} />
    </div>
  );
};

const styles = tw({
  container: `
    relative
    mb-4
  `,
  header: `
    flex flex-col
  `,
  lid: `
    text-sm text-current/62.5
  `,
})
