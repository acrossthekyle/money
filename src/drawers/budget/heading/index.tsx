import tw from '@/styles';
import type { Budget } from '@/types';

type Props = {
  budget?: Budget;
};

export default function Heading({ budget }: Props) {
  return (
    <h2 className={styles.container} id="dialog-header">
      <span>
        {budget !== undefined ? `Edit ${budget.name}` : 'Add transaction'}
      </span>
      <span className={styles.lid}>
        <span>Multi-step form</span>
      </span>
    </h2>
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
