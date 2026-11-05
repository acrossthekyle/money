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
      <Ui.Form.Options>
        <Ui.Form.Option
          isActive={choice === 'all'}
          onClick={() => handleOnChange('all')}
        >
          All past, present, and future dates
        </Ui.Form.Option>
        <Ui.Form.Option
          isActive={choice === 'this'}
          onClick={() => handleOnChange('this')}
        >
          Only {format(date?.date, DATE_DISPLAY)}
        </Ui.Form.Option>
        <Ui.Form.Option
          isActive={choice === 'prospective'}
          onClick={() => handleOnChange('prospective')}
        >
          From {format(date?.date, DATE_DISPLAY)} onwards
        </Ui.Form.Option>
        <Ui.Form.Option
          isActive={choice === 'future'}
          onClick={() => handleOnChange('future')}
        >
          After {format(date?.date, DATE_DISPLAY)}
        </Ui.Form.Option>
      </Ui.Form.Options>
      <Ui.Form.Actions>
        {children}
        <Ui.Form.Action
          isBlocked={isBlocked}
          onClick={() => onContinue(choice)}
        >
          Continue
        </Ui.Form.Action>
      </Ui.Form.Actions>
    </Ui.Form.Container>
  );
};
