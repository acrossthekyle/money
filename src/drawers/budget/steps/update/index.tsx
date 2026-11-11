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

  if (!date || !isActive) {
    return null;
  }

  return (
    <>
      <Ui.Drawer.Body>
        <Ui.Form.Header>{header}</Ui.Form.Header>
        <Ui.Form.Paragraph>
          How should these changes be applied?
        </Ui.Form.Paragraph>
        <Ui.Form.Container>
          <Ui.Form.Field>
            <Ui.Form.Legend>Choose one</Ui.Form.Legend>
            <Ui.Form.Options>
              <Ui.Form.Option
                isActive={choice === 'all'}
                label="All past, present, and future dates"
                onSelect={() => handleOnChange('all')}
              />
              <Ui.Form.Option
                isActive={choice === 'this'}
                label={`Only ${format(date?.date, DATE_DISPLAY)}`}
                onSelect={() => handleOnChange('this')}
              />
              <Ui.Form.Option
                isActive={choice === 'prospective'}
                label={`From ${format(date?.date, DATE_DISPLAY)} onwards`}
                onSelect={() => handleOnChange('prospective')}
              />
              <Ui.Form.Option
                isActive={choice === 'future'}
                label={`After ${format(date?.date, DATE_DISPLAY)}`}
                onSelect={() => handleOnChange('future')}
              />
            </Ui.Form.Options>
          </Ui.Form.Field>
        </Ui.Form.Container>
      </Ui.Drawer.Body>
      <Ui.Drawer.Footer>
        <Ui.Components.Button
          isDisabled={isBlocked}
          isPrimary
          onClick={() => onContinue(choice)}
        >
          Save & Continue
        </Ui.Components.Button>
        {children}
      </Ui.Drawer.Footer>
    </>
  );
};
