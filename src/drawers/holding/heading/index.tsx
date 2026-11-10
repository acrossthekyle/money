import tw from '@/styles';
import type { Holding } from '@/types';

import Updated from './updated';

type Props = {
  holding?: Holding;
  zone: string;
};

export default function Heading({ holding, zone }: Props) {
  const isEditing = holding !== undefined;

  return (
    <>
      <h2 className={styles.container} id="dialog-header">
        <span>
          {isEditing ? `Edit ${holding.name}` : 'Add to portfolio'}
        </span>
        <span className={styles.lid}>
          <span>Multi-step form</span>
        </span>
      </h2>
      {isEditing && (
        <Updated updated={holding?.updated} zone={zone} />
      )}
    </>
  );
};

const styles = tw({
  container: `
    flex flex-col
  `,
  lid: `
    flex justify-between
    text-current/62.5

    sm:text-sm
  `,
})
