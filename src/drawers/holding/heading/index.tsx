import tw, { cs } from '@/styles';
import type { Holding } from '@/types';
import Ui from '@/ui';

type Props = {
  holding?: Holding;
  onBack: () => void;
  step: number;
  total: number;
};

export default function Heading({
  holding,
  onBack,
  step,
  total,
}: Props) {
  if (holding) {
    return (
      <>
        <h2 id="drawer-header">
          {holding.name}
        </h2>
        <p className={styles.lid}>
          Edit {holding.type === 'property' ? 'asset' : 'account'}
        </p>
        {step > 0 && (
          <Ui.Form.Back onBack={onBack} />
        )}
      </>
    );
  }

  return (
    <>
      <h2 id="drawer-header">
        Add to Portfolio
      </h2>
      <p className={cs(styles.lid, styles.spacer)}>
        {step === total ? `Review` : `Step ${step + 1}`}
      </p>
      <Ui.Form.Back
        isDisabled={step === 0}
        onBack={onBack}
      />
      <Ui.Components.Progress.Container>
        <Ui.Components.Progress.Bar>
          <Ui.Components.Progress.Progress percent={(step/total) * 100} />
        </Ui.Components.Progress.Bar>
      </Ui.Components.Progress.Container>
    </>
  );
};

const styles = tw({
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
})
