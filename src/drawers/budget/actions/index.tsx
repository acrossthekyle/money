'use client';

import Ui from '@/ui'

type Props = {
  canGoBack: boolean;
  canCancel: boolean;
  onBack: () => void;
  onCancel: () => void;
};

export default function Actions({
  canGoBack,
  canCancel,
  onBack,
  onCancel,
}: Props) {
  return (
    <>
      {canGoBack && (
        <Ui.Components.Button isGhost onClick={onBack}>Back</Ui.Components.Button>
      )}
      {canCancel && (
        <Ui.Components.Button isGhost onClick={onCancel}>Cancel</Ui.Components.Button>
      )}
    </>
  );
};
