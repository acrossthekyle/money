import { Forms } from '@/forms';
import type { Today } from '@/types';
import Ui from '@/ui';

type Props = {
  data: {
    date: Today;
  };
};

export default function View({ data }: Props) {
  return (
    <>
      <Ui.Components.Divider />
      <Ui.Components.Header lid="Account/asset" title="Create" />
      <Forms.Holding date={data.date} />
    </>
  );
};
