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
  const { handleOnChange, number } = useModel(value);

  return (
    <Ui.Form.Container isActive={isActive}>
      <Ui.Form.Header>{header}</Ui.Form.Header>
      <Ui.Form.Content>
        <Ui.Form.Input
          className="!w-20"
          value={number}
          maxLength={4}
          name="number"
          onChange={handleOnChange}
          placeholder="1234"
          type="text"
        />
      </Ui.Form.Content>
      <Ui.Form.Actions>
        {children}
        <Ui.Form.Action
          isEditing={isEditing}
          onClick={() => onNext('number', number)}
        >
          {number ? 'Next' : 'Skip'}
        </Ui.Form.Action>
      </Ui.Form.Actions>
    </Ui.Form.Container>
  );
};
