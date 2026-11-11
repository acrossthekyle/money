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
  const { end, handleOnChange } = useModel(value);

  if (!isActive) {
    return null;
  }

  return (
    <>
      <Ui.Drawer.Body>
        <Ui.Form.Header>{header}</Ui.Form.Header>
        <Ui.Form.Paragraph>
          Does this transaction stop at some point?
        </Ui.Form.Paragraph>
        <Ui.Form.Container>
          <Ui.Form.Field>
            <Ui.Form.Label htmlFor="end">End date (optional)</Ui.Form.Label>
            <Ui.Form.Input
              id="end"
              value={end}
              name="end"
              onChange={handleOnChange}
              type="date"
            />
          </Ui.Form.Field>
        </Ui.Form.Container>
      </Ui.Drawer.Body>
      <Ui.Drawer.Footer>
        <Ui.Components.Button
          isPrimary
          onClick={() => onNext('end', end)}
        >
          {end ? 'Save & Continue' : 'Skip'}
        </Ui.Components.Button>
        {children}
      </Ui.Drawer.Footer>
    </>
  );
};
