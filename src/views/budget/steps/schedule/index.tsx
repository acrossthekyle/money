'use client';

import Ui from '@/ui';

import { SCHEDULES } from '../../constants';

import { useModel } from './model';

type Props = {
  header: string;
  isActive: boolean;
  isEditing: boolean;
  onNext: (key: string, value: string) => void;
  value: string;
};

export default function Section({
  children,
  header,
  isActive,
  isEditing,
  onNext,
  value,
}: React.PropsWithChildren<Props>) {
  const { handleOnChange, isBlocked, schedule } = useModel(value);

  return (
    <Ui.Form.Container isActive={isActive}>
      <Ui.Form.Header>{header}</Ui.Form.Header>
      <Ui.Form.Options>
        {SCHEDULES.map((item) => (
          <Ui.Form.Option
            isActive={schedule === item.value}
            key={item.value}
            onClick={() => handleOnChange(item.value)}
          >
            <span>{item.name}</span>
          </Ui.Form.Option>
        ))}
      </Ui.Form.Options>
      <Ui.Form.Actions>
        {children}
        <Ui.Form.Action
          isBlocked={isBlocked}
          isEditing={isEditing}
          onClick={() => onNext('schedule', schedule)}
        >
          Next
        </Ui.Form.Action>
      </Ui.Form.Actions>
    </Ui.Form.Container>
  );
};
