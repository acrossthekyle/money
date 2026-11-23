import tw, { cs } from '@/styles';
import type { Holding } from '@/types';
import Ui from '@/ui';

type Props = {
  holding?: Holding;
  step: number;
  total: number;
};

export default function Heading({
  holding,
  step,
  total,
}: Props) {
  if (holding) {
    return (
      <>
        <h2 className={styles.header} id="drawer-header">
          {holding.name}
        </h2>
        <p className={styles.lid}>
          Edit {holding.type === 'property' ? 'asset' : 'account'}
        </p>
      </>
    );
  }

  return (
    <>
      <h2 className={styles.header} id="drawer-header">
        Add to Portfolio
      </h2>
      <p className={cs(styles.lid, styles.spacer)}>
        {step === total ? `Review` : `Step ${step + 1}`}
      </p>
      <Ui.Components.Progress.Container>
        <Ui.Components.Progress.Bar>
          <Ui.Components.Progress.Progress percent={(step/total) * 100} />
        </Ui.Components.Progress.Bar>
      </Ui.Components.Progress.Container>
    </>
  );
};

const styles = tw({
  header: `
    pr-12
    truncate
  `,
  lid: `
    text-current/62.5

    sm:text-sm
  `,
  spacer: `
    mb-3
  `,
  capitalize: `
    capitalize
  `,
});
