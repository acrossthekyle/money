'use client';

import Ui from '@/ui';

import { useModel } from './model';

type Props = {
  header: string;
  isActive: boolean;
  onNext: (key: string, value: string) => void;
  value: string;
};

export default function Section({
  children,
  header,
  isActive,
  onNext,
  value,
}: React.PropsWithChildren<Props>) {
  const { handleOnChange, isBlocked, start } = useModel(value);

  if (!isActive) {
    return null;
  }

  return (
    <>
      <Ui.Drawer.Body>
        <Ui.Form.Header>{header}</Ui.Form.Header>
        <Ui.Form.Paragraph>
          When does this transaction occur?
        </Ui.Form.Paragraph>
        <Ui.Form.Container>
          <Ui.Form.Field>
            <Ui.Form.Label htmlFor="start">Start date</Ui.Form.Label>
            <Ui.Form.Input
              id="start"
              value={start}
              name="start"
              onChange={handleOnChange}
              type="date"
            />
          </Ui.Form.Field>
        </Ui.Form.Container>
      </Ui.Drawer.Body>
      <Ui.Drawer.Footer>
        <Ui.Components.Button
          isDisabled={isBlocked}
          isPrimary
          onClick={() => onNext('start', start)}
        >
          Save & Continue
        </Ui.Components.Button>
        {children}
      </Ui.Drawer.Footer>
    </>
  );
};
