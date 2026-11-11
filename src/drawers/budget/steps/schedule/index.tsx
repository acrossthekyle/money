'use client';

import Ui from '@/ui';

import { SCHEDULES } from '../../constants';

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
  const { handleOnChange, isBlocked, schedule } = useModel(value);

  if (!isActive) {
    return null;
  }

  return (
    <>
      <Ui.Drawer.Body>
        <Ui.Form.Header>{header}</Ui.Form.Header>
        <Ui.Form.Paragraph>
          How often does this transaction repeat?
        </Ui.Form.Paragraph>
        <Ui.Form.Container>
          <Ui.Form.Field>
            <Ui.Form.Legend>Frequency</Ui.Form.Legend>
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
          Save & Continue
        </Ui.Components.Button>
        {children}
      </Ui.Drawer.Footer>
    </>
  );
};
