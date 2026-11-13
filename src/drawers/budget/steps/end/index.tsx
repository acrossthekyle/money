'use client';

import Ui from '@/ui';

import { useModel } from './model';

type Props = {
  isActive: boolean;
  isEditing: boolean;
  onNext: (key: string, value: string) => void;
  value: string;
};

export default function Section({
  children,
  isActive,
  isEditing,
  onNext,
  value,
}: React.PropsWithChildren<Props>) {
  const { end, handleOnChange } = useModel(value);

  if (!isActive) {
    return null;
  }

  return (
    <>
      <Ui.Drawer.Body>
        <Ui.Form.Container>
          <Ui.Form.Field>
            <Ui.Form.Label htmlFor="end">
              Does this transaction stop at some point?
            </Ui.Form.Label>
            <Ui.Form.Input
              id="end"
              value={end}
              name="end"
              onChange={handleOnChange}
              type="date"
            />
            <Ui.Form.Hint>
              Optional
            </Ui.Form.Hint>
          </Ui.Form.Field>
        </Ui.Form.Container>
      </Ui.Drawer.Body>
      <Ui.Drawer.Footer>
        <Ui.Components.Button
          isPrimary
          onClick={() => onNext('end', end)}
        >
          {isEditing ? 'Save & Review' : (end ? 'Save & Continue' : 'Skip')}
        </Ui.Components.Button>
        {children}
      </Ui.Drawer.Footer>
    </>
  );
};
