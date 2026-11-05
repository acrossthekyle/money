'use client';

import Ui from '@/ui';

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
  const { handleOnChange, isBlocked, start } = useModel(value);

  return (
    <Ui.Form.Container isActive={isActive}>
      <Ui.Form.Header>{header}</Ui.Form.Header>
      <Ui.Form.Content>
        <Ui.Form.Input
          className="!w-66 md:!w-50"
          value={start}
          name="start"
          onChange={handleOnChange}
          type="date"
        />
      </Ui.Form.Content>
      <Ui.Form.Actions>
        {children}
        <Ui.Form.Action
          isBlocked={isBlocked}
          isEditing={isEditing}
          onClick={() => onNext('start', start)}
        >
          Next
        </Ui.Form.Action>
      </Ui.Form.Actions>
    </Ui.Form.Container>
  );
};
