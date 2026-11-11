'use client';

import Ui from '@/ui';

import { useModel } from './model';

type Props = {
  header: string;
  isActive: boolean;
  onNext: (key: string, value: string) => void;
  paragraph: string;
  value: string;
};

export default function Section({
  children,
  header,
  isActive,
  onNext,
  paragraph,
  value,
}: React.PropsWithChildren<Props>) {
  const { handleOnChange, number } = useModel(value);

  if (!isActive) {
    return null;
  }

  return (
    <>
      <Ui.Drawer.Body>
        <Ui.Form.Header>{header}</Ui.Form.Header>
        <Ui.Form.Paragraph>{paragraph}</Ui.Form.Paragraph>
        <Ui.Form.Container>
          <Ui.Form.Field>
            <Ui.Form.Label htmlFor="holding-number">
              Last four (optional)
            </Ui.Form.Label>
            <Ui.Form.Input
              value={number}
              maxLength={4}
              name="number"
              onChange={handleOnChange}
              placeholder="1234"
              type="text"
            />
          </Ui.Form.Field>
        </Ui.Form.Container>
      </Ui.Drawer.Body>
      <Ui.Drawer.Footer>
        <Ui.Components.Button
          isPrimary
          onClick={() => onNext('number', number)}
        >
          {number ? 'Save & Continue' : 'Skip'}
        </Ui.Components.Button>
        {children}
      </Ui.Drawer.Footer>
    </>
  );
};
