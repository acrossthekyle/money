'use client';

import Ui from '@/ui';

import { useModel } from './model';

type Props = {
  header: string;
  isActive: boolean;
  isEditing: boolean;
  onNext: (key: string, value: boolean) => void;
  value: boolean;
};

export default function Section({
  children,
  header,
  isActive,
  isEditing,
  onNext,
  value,
}: React.PropsWithChildren<Props>) {
  const { answer, handleOnChange } = useModel(value);

  return (
    <Ui.Form.Container isActive={isActive}>
      <Ui.Form.Header>{header}</Ui.Form.Header>
      <Ui.Form.Options>
        <Ui.Form.Option
          isActive={answer}
          onClick={() => handleOnChange(true)}
        >
          Yes
        </Ui.Form.Option>
        <Ui.Form.Option
          isActive={!answer}
          onClick={() => handleOnChange(false)}
        >
          No
        </Ui.Form.Option>
      </Ui.Form.Options>
      <Ui.Form.Actions>
        {children}
        <Ui.Form.Action
          isEditing={isEditing}
          onClick={() => onNext('pinned', answer)}
        >
          {answer ? 'Next' : 'Skip'}
        </Ui.Form.Action>
      </Ui.Form.Actions>
    </Ui.Form.Container>
  );
};
