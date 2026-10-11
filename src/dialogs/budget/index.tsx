'use client';

import type { Budget, Dateable, Holding } from '@/types';
import Ui from '@/ui';

import {
  Amount,
  Category,
  End,
  Name,
  Schedule,
  Start,
  Transferee,
  Type,
} from './components';
import { useModel } from './model';

type Props = {
  budget?: Budget;
  date: Dateable;
  holdings: Holding[];
  parent: string;
};

export default function Dialog({
  budget,
  date,
  holdings,
  parent,
}: Props) {
  const {
    action,
    data,
    errors,
    handleOnCancel,
    handleOnContinue,
    handleOnType,
    instance,
    isActive,
    isPending,
    onBackdrop,
    onCancel,
    onClose,
    type,
    update,
  } = useModel(date, parent, budget);

  return (
    <Ui.Dialog.Dialog
      id="budget-dialog"
      instance={instance}
      isActive={isActive}
      onBackdrop={onBackdrop}
      onCancel={onCancel}
    >
      <Ui.Dialog.DialogInner isActive={isActive}>
        <Ui.Dialog.DialogHeader
          icon={budget ? 'edit' : 'add'}
          onClose={onClose}
        >
          Transaction
        </Ui.Dialog.DialogHeader>
        <Ui.Alerts.Errors items={errors} message="Form validation failed" />
        <form
          action={action}
          key={budget?.id || date.iso}
          id="budget-form"
        >
          <Ui.Form.Inner>
            <Name value={data?.name} />
            <Amount value={data?.amount} />
            <Type
              onChange={handleOnType}
              value={data?.type}
            />
            <Category value={data?.category} />
            <Transferee
              holding={parent}
              holdings={holdings}
              type={type}
              value={data?.transferee}
            />
            <Start
              date={date}
              value={data?.start}
            />
            <End
              date={date}
              value={data?.end}
            />
            <Schedule value={data?.schedule} />
            <input
              name="date"
              type="text"
              value={date.iso}
              readOnly
              className="hidden"
            />
            <input
              name="parent"
              type="text"
              value={parent}
              readOnly
              className="hidden"
            />
            <input
              name="update"
              type="text"
              value={budget === undefined || budget?.schedule === 'once' ? 'this' : update}
              readOnly
              required={budget !== undefined}
              className="hidden"
            />
          </Ui.Form.Inner>
          <Ui.Form.Footer>
            <Ui.Form.Cancel onClick={handleOnCancel} />
            {!budget ? (
              <Ui.Form.Submit disabled={isPending} isPending={isPending} />
            ) : (
              <Ui.Form.Continue disabled={isPending} onClick={handleOnContinue} />
            )}
          </Ui.Form.Footer>
        </form>
      </Ui.Dialog.DialogInner>
    </Ui.Dialog.Dialog>
  );
};
