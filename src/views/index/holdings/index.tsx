import tw from '@/styles';
import type { Holding, Metric } from '@/types';

import Add from './add';
import Item from './item';

type Props = {
  items: Holding[];
  metrics: {
    monthly: Metric[];
  };
  onAdd: () => void;
  onBudget: (holding: Holding) => void;
  onEdit: (holding: Holding) => void;
};

export default function Holdings({ items, metrics, onAdd, onBudget, onEdit }: Props) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section aria-label="accounts/assets" className={styles.container}>
      <ul className={styles.items}>
        {items.map((item, index) => {
          const data = metrics.monthly.find(metric => metric.holding === item.id);

          return (
            <Item
              data={data}
              item={item}
              key={index}
              onBudget={onBudget}
              onEdit={onEdit}
            />
          );
        })}
        <Add onClick={onAdd} />
      </ul>
    </section>
  );
};

const styles = tw({
  container: `
    col-span-14
  `,
  items: `
    grid grid-cols-1 gap-4

    md:grid-cols-2
  `,
});
