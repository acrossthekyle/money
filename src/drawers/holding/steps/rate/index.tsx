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
  const { handleOnChange, rate } = useModel(value);

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
            <Ui.Form.Label htmlFor="holding-rate">Value</Ui.Form.Label>
            <Ui.Form.Percent
              id="holding-rate"
              onChange={handleOnChange}
              value={rate}
            />
          </Ui.Form.Field>
        </Ui.Form.Container>
      </Ui.Drawer.Body>
      <Ui.Drawer.Footer>
        <Ui.Components.Button
          isPrimary
          onClick={() => onNext('interest', rate)}
        >
          {rate ? 'Save & Continue' : 'Skip'}
        </Ui.Components.Button>
        {children}
      </Ui.Drawer.Footer>
    </>
  );
};
