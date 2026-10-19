'use client';

import { format } from 'date-fns';

import { DATE_DISPLAY } from '@/constants';
import type { Dateable } from '@/types';

import {
  Action,
  Actions,
  Container,
  Header,
  Option,
  Options,
} from '../../../components';

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
    <Container isActive={isActive}>
      <Header>{header}</Header>
      <Options>
        <Option
          isActive={choice === 'all'}
          onClick={() => handleOnChange('all')}
        >
          All past, present, and future dates
        </Option>
        <Option
          isActive={choice === 'this'}
          onClick={() => handleOnChange('this')}
        >
          Only {format(date?.date, DATE_DISPLAY)}
        </Option>
        <Option
          isActive={choice === 'prospective'}
          onClick={() => handleOnChange('prospective')}
        >
          From {format(date?.date, DATE_DISPLAY)} onwards
        </Option>
        <Option
          isActive={choice === 'future'}
          onClick={() => handleOnChange('future')}
        >
          After {format(date?.date, DATE_DISPLAY)}
        </Option>
      </Options>
      <Actions>
        {children}
        <Action
          isBlocked={isBlocked}
          onClick={() => onContinue(choice)}
        >
          Continue
        </Action>
      </Actions>
    </Container>
  );
};
