import type { Holding } from '@/types';
import Ui from '@/ui';

import { balance } from './utils';

type Props = {
  holding: Holding;
  worth: number;
};

export default function Worth({ holding, worth }: Props) {
  const { amount, percent, total } = balance(holding, worth);

  return (
    <Ui.Components.Progress.Container>
      <Ui.Components.Progress.Bar>
        <Ui.Components.Progress.Progress percent={percent} />
      </Ui.Components.Progress.Bar>
      <Ui.Components.Progress.Labels>
        <Ui.Components.Progress.Amount>
          {amount}
        </Ui.Components.Progress.Amount>
        <Ui.Components.Progress.Total>
          {total}
        </Ui.Components.Progress.Total>
      </Ui.Components.Progress.Labels>
    </Ui.Components.Progress.Container>
  );
};
