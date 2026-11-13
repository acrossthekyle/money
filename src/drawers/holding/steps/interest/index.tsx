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
  const { handleOnChange, interest } = useModel(value);

  if (!isActive) {
    return null;
  }

  return (
    <>
      <Ui.Drawer.Body>
        <Ui.Form.Container>
          <Ui.Form.Field>
            <Ui.Form.Label htmlFor="holding-interest">{label}</Ui.Form.Label>
            <Ui.Form.Percent
              id="holding-interest"
              onChange={handleOnChange}
              value={interest}
            />
            <Ui.Form.Hint>Optional, only enter numbers and decimal points</Ui.Form.Hint>
          </Ui.Form.Field>
        </Ui.Form.Container>
      </Ui.Drawer.Body>
      <Ui.Drawer.Footer>
        <Ui.Components.Button
          isPrimary
          onClick={() => onNext('interest', interest)}
        >
          {isEditing ? 'Save & Review' : (interest ? 'Save & Continue' : 'Skip')}
        </Ui.Components.Button>
        {children}
      </Ui.Drawer.Footer>
    </>
  );
};
