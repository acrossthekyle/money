import tw from '@/styles';
import type { Holding } from '@/types';

import Add from './add';
import Item from './item';
import type { MappedHolding } from './types';

type Props = {
  items: MappedHolding[];
  onAdd: () => void;
  onBudget: (holding: Holding) => void;
  onEdit: (holding: Holding) => void;
};

export default function Holdings({ items, onAdd, onBudget, onEdit }: Props) {
  return (
    <section aria-label="accounts/assets">
      <ul className={styles.items}>
        {items.map((item, index) => (
          <Item
            item={item}
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
  items: `
    grid grid-cols-1 gap-4
    px-4 pb-4

    md:grid-cols-2
  `,
});
