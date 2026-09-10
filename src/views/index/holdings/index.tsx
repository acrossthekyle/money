import tw from '@/styles';
import type { Holding, Metric } from '@/types';

import Add from './add';
import Item from './item';

type Props = {
  metrics: Metric[];
  onAdd: () => void;
  onBudget: (holding: Holding) => void;
  onEdit: (holding: Holding) => void;
};

export default function Holdings({ metrics, onAdd, onBudget, onEdit }: Props) {
  if (metrics.length === 0) {
    return null;
  }

  return (
    <section aria-label="accounts/assets" className={styles.container}>
      <ul className={styles.items}>
        {metrics.map((metric, index) => (
          <Item
            current={metric.months.current}
            holding={metric.holding}
            key={index}
            onBudget={onBudget}
            onEdit={onEdit}
          />
        ))}
        <Add onClick={onAdd} />
      </ul>
    </section>
  );
};

const styles = tw({
  container: `
    order-1

    md:block
    md:col-span-24
  `,
  items: `
    grid grid-cols-1 gap-4

    md:grid-cols-2
    lg:grid-cols-3
  `,
});
