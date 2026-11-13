'use client';

import Ui from '@/ui';

import { useModel } from './model';

type Props = {
  isActive: boolean;
  isEditing: boolean;
  onNext: (key: string, value: string) => void;
  label: string;
  value: string;
};

export default function Section({
  children,
  isActive,
  isEditing,
  onNext,
  label,
  value,
}: React.PropsWithChildren<Props>) {
  const { balance, handleOnChange, isBlocked } = useModel(value);

  if (!isActive) {
    return null;
  }

  return (
    <>
      <Ui.Drawer.Body>
        <Ui.Form.Container>
          <Ui.Form.Field>
            <Ui.Form.Label htmlFor="holding-amount">{label}</Ui.Form.Label>
            <Ui.Form.Currency
              id="holding-amount"
              onChange={handleOnChange}
              value={balance}
            />
            <Ui.Form.Hint>Only enter numbers and decimal points</Ui.Form.Hint>
          </Ui.Form.Field>
        </Ui.Form.Container>
      </Ui.Drawer.Body>
      <Ui.Drawer.Footer>
        <Ui.Components.Button
          isDisabled={isBlocked}
          isPrimary
          onClick={() => onNext('balance', balance)}
        >
          {isEditing ? 'Save & Review' : 'Save & Continue'}
        </Ui.Components.Button>
        {children}
      </Ui.Drawer.Footer>
    </>
  );
};
