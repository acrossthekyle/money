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
        <Ui.Form.Action isOutline onClick={onBack}>Back</Ui.Form.Action>
      )}
      {canCancel && (
        <Ui.Form.Action isOutline onClick={onCancel}>Cancel</Ui.Form.Action>
      )}
    </>
  );
};
