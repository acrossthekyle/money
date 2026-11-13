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
          Manage {holding.name}
        </h2>
        <p className={cs(styles.lid, styles.capitalize)}>
          {holding.type.replace(/_/g, ' ')} {holding.type === 'property' ? 'Asset' : 'Account'}
        </p>
      </>
    );
  }

  return (
    <>
      <h2 id="drawer-header">
        Add to portfolio
      </h2>
      <p className={styles.lid}>
        {step === total ? `Review` : `Step ${step + 1}`}
      </p>
      <Ui.Form.Back
        isDisabled={step === 0}
        onBack={onBack}
      />
      <Ui.Components.Progress.Container>
        <Ui.Components.Progress.Bar percent={(step/total) * 100} />
      </Ui.Components.Progress.Container>
    </>
  );
};

const styles = tw({
  lid: `
    text-current/62.5

    sm:text-sm
  `,
  capitalize: `
    capitalize
  `,
})
