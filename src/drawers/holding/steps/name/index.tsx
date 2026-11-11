'use client';

import Ui from '@/ui';

import { useModel } from './model';

type Props = {
  header: string;
  isActive: boolean;
  onNext: (key: string, value: string) => void;
  paragraph: string;
  placeholder: string;
  value: string;
};

export default function Section({
  children,
  header,
  isActive,
  onNext,
  paragraph,
  placeholder,
  value,
}: React.PropsWithChildren<Props>) {
  const { handleOnChange, isBlocked, name } = useModel(value);

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
            <Ui.Form.Label htmlFor="holding-name">Name</Ui.Form.Label>
            <Ui.Form.Input
              id="holding-name"
              value={name}
              maxLength={48}
              name="name"
              onChange={handleOnChange}
              placeholder={placeholder}
              type="text"
            />
          </Ui.Form.Field>
        </Ui.Form.Container>
      </Ui.Drawer.Body>
      <Ui.Drawer.Footer>
        <Ui.Components.Button
          isDisabled={isBlocked}
          isPrimary
          onClick={() => onNext('name', name)}
        >
          Save & Continue
        </Ui.Components.Button>
        {children}
      </Ui.Drawer.Footer>
    </>
  );
};
