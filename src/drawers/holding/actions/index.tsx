'use client';

import Ui from '@/ui'

type Props = {
  isEditing: boolean;
  onCancel: () => void;
  step: number;
};

export default function Actions({
  isEditing,
  onCancel,
  step,
}: Props) {
  return (
    <Ui.Components.Button isGhost onClick={onCancel}>
      {isEditing ? 'Back' : (step > 0 ? 'Back' : 'Cancel')}
    </Ui.Components.Button>
  );
};
