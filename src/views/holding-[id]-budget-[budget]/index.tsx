import { Forms } from '@/forms';
import tw from '@/styles';
import type { Budget, Holding } from '@/types';
import Ui from '@/ui';

type Props = {
  data: {
    budget?: Budget;
    date: string;
    holdings: Holding[];
    parent: string;
  };
};

export default function View({ data }: Props) {
  return (
    <>
    <Ui.Components.Divider />
      <h1 className={styles.header}>
        <span className={styles.title}>
          Edit Budget
        </span>
      </h1>
      <Forms.Budget
        budget={data.budget}
        date={data.date}
        holdings={data.holdings}
        parent={data.parent}
      />
    </>
  );
};

const styles = tw({
  header: `
    flex flex-col gap-1
    text-sm
    uppercase
  `,
  title: `
    font-bold
  `,
  lid: `
    text-xs
  `,
});
