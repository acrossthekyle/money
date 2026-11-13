import tw, { cs } from '@/styles';
import type { Budget } from '@/types';
import Ui from '@/ui';

type Props = {
  budget?: Budget;
  onBack: () => void;
  step: number;
  total: number;
};

export default function Heading({
  budget,
  onBack,
  step,
  total,
}: Props) {
  if (budget) {
    return (
      <>
        <h2 id="drawer-header">
          Manage {budget.name}
        </h2>
        <p className={cs(styles.lid, styles.capitalize)}>
          {budget.schedule} {budget.category}
        </p>
      </>
    );
  }

  return (
    <>
      <h2 id="drawer-header">
        Add transaction
      </h2>
      <p className={styles.lid}>
        {step === total ? `Review` : `Step ${step + 1}`}
      </p>
      <Ui.Form.Back
        isDisabled={step === 0}
        onBack={onBack}
      />
      <Ui.Components.Progress.Container>
        <Ui.Components.Progress.Bar percent={(step /total) * 100} />
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
