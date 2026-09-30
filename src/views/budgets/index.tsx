import tw from '@/styles';
import type { Budget } from '@/types';
import Ui from '@/ui';

import Item from './item';

type Props = {
  data: {
    budgets: Budget[];
  };
};

export default function View({ data }: Props) {
  return (
    <>
      <Ui.Components.Divider />
      <Ui.Components.Header
        lid={`${data.budgets.length} items`}
        title="Budgets"
      />
      {data.budgets.length === 0 && (
        <>
          <p className={styles.start}>
            No items found.
          </p>
        </>
      )}
      {data.budgets.length > 0 && (
        <>
          <Ui.Components.Divider />
          <ul className={styles.items}>
            {data.budgets.map((budget) => (
              <li className={styles.item} key={budget.id}>
                <Item budget={budget} />
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

const styles = tw({
  start: `
    text-sm
    uppercase

    md:text-xs
  `,
  items: `
    flex flex-col gap-8
    h-full
  `,
  item: `
    relative
  `,
})
