import tw from '@/styles';
import type { Budget } from '@/types';
import Ui from '@/ui';

type Props = {
  budget?: Budget;
  onBack: () => void;
  step: number;
};

export default function Heading({
  budget,
  onBack,
  step,
}: Props) {
  const isEditing = budget !== undefined;

  return (
    <>
      <h2 id="dialog-header">
        {isEditing ? `Edit ${budget.name}` : 'Add transaction'}
      </h2>
      <p className={styles.lid}>
        Multi-step form
      </p>
      <Ui.Form.Back
        isDisabled={step === 0}
        onBack={onBack}
      />
    </>
  );
};

const styles = tw({
  lid: `
    text-current/62.5

    sm:text-sm
  `,
})
