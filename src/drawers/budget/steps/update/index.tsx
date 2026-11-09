'use client';

import { format } from 'date-fns';

import { DATE_DISPLAY } from '@/constants';
import type { Dateable } from '@/types';
import Ui from '@/ui';

import { useModel } from './model';

type Props = {
  date?: Dateable;
  header: string;
  isActive: boolean;
  onContinue: (choice: string) => void;
};

export default function Section({
  children,
  date,
  header,
  isActive,
  onContinue,
}: React.PropsWithChildren<Props>) {
  const { choice, handleOnChange, isBlocked } = useModel();

  if (!date) {
    return null;
  }

  return (
    <Ui.Form.Container isActive={isActive}>
      <Ui.Form.Header>{header}</Ui.Form.Header>
      <Ui.Form.Paragraph>
        How should these changes be applied?
      </Ui.Form.Paragraph>
      <Ui.Form.Options>
        <Ui.Form.Legend>Choose one</Ui.Form.Legend>
        <Ui.Form.Option
          isActive={choice === 'all'}
          label="All past, present, and future dates"
          name="update"
          onSelect={() => handleOnChange('all')}
          value="all"
        />
        <Ui.Form.Option
          isActive={choice === 'this'}
          label={`Only ${format(date?.date, DATE_DISPLAY)}`}
          name="update"
          onSelect={() => handleOnChange('this')}
          value="this"
        />
        <Ui.Form.Option
          isActive={choice === 'prospective'}
          label={`From ${format(date?.date, DATE_DISPLAY)} onwards`}
          name="update"
          onSelect={() => handleOnChange('prospective')}
          value="prospective"
        />
        <Ui.Form.Option
          isActive={choice === 'future'}
          label={`After ${format(date?.date, DATE_DISPLAY)}`}
          name="update"
          onSelect={() => handleOnChange('future')}
          value="future"
        />
      </Ui.Form.Options>
      <Ui.Form.Actions>
        <Ui.Components.Button
          isDisabled={isBlocked}
          isPrimary
          onClick={() => onContinue(choice)}
        >
          Continue
        </Ui.Components.Button>
        {children}
      </Ui.Form.Actions>
    </Ui.Form.Container>
  );
};
