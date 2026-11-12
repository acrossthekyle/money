import tw from '@/styles';
import type { Holding } from '@/types';
import Ui from '@/ui';

import Updated from './updated';

type Props = {
  holding?: Holding;
  onBack: () => void;
  step: number;
  zone: string;
};

export default function Heading({
  holding,
  onBack,
  step,
  zone,
}: Props) {
  const isEditing = holding !== undefined;

  return (
    <>
      <h2 id="drawer-header">
        {isEditing ? `Edit ${holding.name}` : 'Add to portfolio'}
      </h2>
      <p className={styles.lid}>
        Multi-step form
      </p>
      <Ui.Form.Back
        isDisabled={step === 0}
        onBack={onBack}
      />
      {isEditing && (
        <Updated updated={holding?.updated} zone={zone} />
      )}
    </>
  );
};

const styles = tw({
  container: `
    flex flex-col
  `,
  lid: `
    text-current/62.5

    sm:text-sm
  `,
})
