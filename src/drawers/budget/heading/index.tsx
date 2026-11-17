import tw, { cs } from '@/styles';
import type { Budget, Dateable } from '@/types';
import Ui from '@/ui';

type Props = {
  budget?: Budget;
  date: Dateable | null;
  isActive: boolean;
  onBack: () => void;
  step: number;
  total: number;
};

export default function Heading({
  budget,
  date,
  isActive,
  onBack,
  step,
  total,
}: Props) {
  if (budget && date) {
    return (
      <>
        <h2 id="drawer-header">
          Manage {budget.name} Transaction
        </h2>
        <p className={cs(styles.lid, styles.spacer)}>
          <span className={styles.capitalize}>{budget.schedule} {budget.category}</span> on {date.display}
        </p>
        {step > 0 && (
          <Ui.Form.Back
            onBack={onBack}
          />
        )}
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
      {isActive && (
        <Ui.Components.Progress.Container>
          <Ui.Components.Progress.Bar>
            <Ui.Components.Progress.Progress percent={(step/total) * 100} />
          </Ui.Components.Progress.Bar>
        </Ui.Components.Progress.Container>
      )}
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
