import { ACCOUNTS } from '@/constants';
import { Forms } from '@/forms';
import tw from '@/styles';
import type { Holding } from '@/types';
import Ui from '@/ui';

type Props = {
  data: {
    holding?: Holding;
  };
};

export default function View({ data }: Props) {
  return (
    <>
      <Ui.Components.Divider />
      <h1 className={styles.header}>
        <span className={styles.title}>
          Edit
          {ACCOUNTS.includes(data.holding?.type || '') ? ' Account ' : ' Asset'}
        </span>
        <span className={styles.lid}>
          {!!data.holding?.institution && `${data.holding?.institution} • `}{data.holding?.name || ''}
        </span>
      </h1>
      <Forms.Holding holding={data.holding} />
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
