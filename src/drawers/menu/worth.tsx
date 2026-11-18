import tw, { cs } from '@/styles';
import type { Holding } from '@/types';
import Ui from '@/ui';
import { currency } from '@/utils';

type Props = {
  holding: Holding;
  worth: number;
};

export default function Worth({ holding, worth }: Props) {
  const balance = Number(holding.balance);
  const percent = (balance / worth) * 100;

  return (
    <Ui.Components.Progress.Container>
      <Ui.Components.Progress.Bar>
        <Ui.Components.Progress.Progress percent={percent} />
      </Ui.Components.Progress.Bar>
      <Ui.Components.Progress.Labels>
        <Ui.Components.Progress.Amount>
          <span className={cs(balance < 0 && styles.negative)}>
            {balance < 0 ? '-' : ''}${currency(String(balance), true)}
          </span>
        </Ui.Components.Progress.Amount>
        <Ui.Components.Progress.Total>
          {holding.type === 'credit_card' ? '0' : currency(percent)}% of Net Worth
        </Ui.Components.Progress.Total>
      </Ui.Components.Progress.Labels>
    </Ui.Components.Progress.Container>
  );
};

const styles = tw({
  negative: `
    text-red-400

    dark:text-rose-400
  `,
});
