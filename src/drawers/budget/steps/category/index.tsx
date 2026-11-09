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

  return (
    <Ui.Form.Container isActive={isActive}>
      <Ui.Form.Header>{header}</Ui.Form.Header>
      <Ui.Form.Paragraph>
        Which category does this belong in?
      </Ui.Form.Paragraph>
      <Ui.Form.Options>
        <Ui.Form.Legend>Choose one</Ui.Form.Legend>
        {CATEGORIES.map((item) => (
          <Ui.Form.Option
            isActive={category === item.value}
            key={item.value}
            label={item.name}
            name="category"
            onSelect={() => handleOnChange(item.value)}
            value={item.value}
          />
        ))}
      </Ui.Form.Options>
      <Ui.Form.Actions>
        <Ui.Components.Button
          isDisabled={isBlocked}
          isPrimary
          onClick={() => onNext('category', category)}
        >
          Next
        </Ui.Components.Button>
        {children}
      </Ui.Form.Actions>
    </Ui.Form.Container>
  );
};
