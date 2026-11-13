'use client';

import Ui from '@/ui';

import { SCHEDULES } from '../../constants';

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
  const { handleOnChange, isBlocked, schedule } = useModel(value);

  if (!isActive) {
    return null;
  }

  return (
    <>
      <Ui.Drawer.Body>
        <Ui.Form.Header>How often does this transaction repeat?</Ui.Form.Header>
        <Ui.Form.Paragraph>
          Choose from the following:
        </Ui.Form.Paragraph>
        <Ui.Form.Container>
          <Ui.Form.Field>
            <Ui.Form.Options>
              {SCHEDULES.map((item) => (
                <Ui.Form.Option
                  isActive={schedule === item.value}
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
          onClick={() => onNext('schedule', schedule)}
        >
          {isEditing ? 'Save & Review' : 'Save & Continue'}
        </Ui.Components.Button>
        {children}
      </Ui.Drawer.Footer>
    </>
  );
};
