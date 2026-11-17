'use client';

import { format } from 'date-fns';

import { DATE_DISPLAY } from '@/constants';
import { BudgetPutActionInputApplysTo, type Dateable } from '@/types';
import Ui from '@/ui';

import { useModel } from './model';

type Props = {
  date: Dateable | null;
  isActive: boolean;
  onDelete: () => void;
  onSubmit: (choice: BudgetPutActionInputApplysTo) => void;
};

export default function Section({
  children,
  date,
  isActive,
  onDelete,
  onSubmit,
}: React.PropsWithChildren<Props>) {
  const { choice, handleOnChange, isBlocked } = useModel();

  if (!date || !isActive) {
    return null;
  }

  return (
    <>
      <Ui.Drawer.Body>
        <Ui.Form.Header>Outcome</Ui.Form.Header>
        <Ui.Form.Paragraph>
          How should these changes be applied?
        </Ui.Form.Paragraph>
        <Ui.Form.Container>
          <Ui.Form.Field>
            <Ui.Form.Legend>Choose one</Ui.Form.Legend>
            <Ui.Form.Options>
              <Ui.Form.Option
                isActive={choice === BudgetPutActionInputApplysTo.All}
                label="All past, present, and future dates"
                onSelect={() => handleOnChange(BudgetPutActionInputApplysTo.All)}
              />
              <Ui.Form.Option
                isActive={choice === BudgetPutActionInputApplysTo.This}
                label={`Only ${format(date.date, DATE_DISPLAY)}`}
                onSelect={() => handleOnChange(BudgetPutActionInputApplysTo.This)}
              />
              <Ui.Form.Option
                isActive={choice === BudgetPutActionInputApplysTo.Prospective}
                label={`From ${format(date.date, DATE_DISPLAY)} onwards`}
                onSelect={() => handleOnChange(BudgetPutActionInputApplysTo.Prospective)}
              />
              <Ui.Form.Option
                isActive={choice === BudgetPutActionInputApplysTo.Future}
                label={`After ${format(date.date, DATE_DISPLAY)}`}
                onSelect={() => handleOnChange(BudgetPutActionInputApplysTo.Future)}
              />
            </Ui.Form.Options>
          </Ui.Form.Field>
        </Ui.Form.Container>
      </Ui.Drawer.Body>
      <Ui.Drawer.Footer>
        <Ui.Components.Button
          isDisabled={isBlocked}
          isPrimary
          onClick={() => onSubmit(choice)}
        >
          Confirm & Update
        </Ui.Components.Button>
        {children}
        <Ui.Form.Delete onClick={onDelete}>
          Delete transaction and update forecast
        </Ui.Form.Delete>
      </Ui.Drawer.Footer>
    </>
  );
};
