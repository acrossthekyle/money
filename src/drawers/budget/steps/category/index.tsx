'use client';

import Ui from '@/ui';

import { CATEGORIES } from '../../constants';

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
  const { category, handleOnChange, isBlocked } = useModel(value);

  if (!isActive) {
    return null;
  }

  return (
    <>
      <Ui.Drawer.Body>
        <Ui.Form.Header>{header}</Ui.Form.Header>
        <Ui.Form.Paragraph>
          Which category does this belong in?
        </Ui.Form.Paragraph>
        <Ui.Form.Container>
          <Ui.Form.Field>
            <Ui.Form.Legend>Choose one</Ui.Form.Legend>
            <Ui.Form.Options>
              {CATEGORIES.map((item) => (
                <Ui.Form.Option
                  isActive={category === item.value}
                  key={item.value}
                  label={item.name}
                  onSelect={() => handleOnChange(item.value)}
                />
              ))}
            </Ui.Form.Options>
          </Ui.Form.Field>
        </Ui.Form.Container>
      </Ui.Drawer.Body>
      <Ui.Drawer.Footer>
        <Ui.Components.Button
          isDisabled={isBlocked}
          isPrimary
          onClick={() => onNext('category', category)}
        >
          Save & Continue
        </Ui.Components.Button>
        {children}
      </Ui.Drawer.Footer>
    </>
  );
};
