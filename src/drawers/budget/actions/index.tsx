'use client';

import Ui from '@/ui'

type Props = {
  onCancel: () => void;
};

export default function Actions({
  onCancel,
}: Props) {
  return (
    <Ui.Components.Button isGhost onClick={onCancel}>
      Cancel
    </Ui.Components.Button>
  );
};
