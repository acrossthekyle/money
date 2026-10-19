'use client';

import type { Holding } from '@/types';
import Ui from '@/ui';

import { Action, Actions } from '../components';

import { useModel } from './model';
import {
  Amount,
  Category,
  End,
  Name,
  Outline,
  Schedule,
  Submit,
  Start,
  Transferee,
  Type,
  Update,
} from './steps';
import { getSubtitle } from './utils';

type Props = {
  holdings: Holding[];
  parent: string;
};

export default function Dialog({ holdings, parent }: Props) {
  const {
    budget,
    data,
    date,
    handleOnBack,
    handleOnCancel,
    handleOnContinue,
    handleOnDelete,
    handleOnEdit,
    handleOnNext,
    handleOnSubmit,
    instance,
    isActive,
    isEditing,
    onBackdrop,
    onCancel,
    step,
    steps,
    update,
  } = useModel(parent);

  return (
    <Ui.Dialog.Dialog
      id="budget-dialog"
      instance={instance}
      isActive={isActive}
      onBackdrop={onBackdrop}
      onCancel={onCancel}
    >
      <Ui.Dialog.DialogInner isActive={isActive}>
        <Ui.Dialog.DialogHeader onClose={handleOnCancel}>
          <Ui.Dialog.DialogTitle text={`${budget ? 'Edit' : 'Add'} Transaction`}>
            <Ui.Dialog.DialogTitleLid>
              {budget ? date?.display : getSubtitle(steps, step, budget)}
            </Ui.Dialog.DialogTitleLid>
          </Ui.Dialog.DialogTitle>
        </Ui.Dialog.DialogHeader>
        <Ui.Dialog.DialogContent key={budget?.id} label="steps">
          <Outline
            data={data}
            date={date}
            holdings={holdings}
            isActive={steps[step] === 'outline'}
            onEdit={handleOnEdit}
            update={update}
          />
          <Type
            header="What kind of transaction is this?"
            isActive={steps[step] === 'type'}
            isEditing={isEditing}
            onNext={handleOnNext}
            value={data.type}
          />
          <Amount
            header={data.type === 'credit' ? 'How much income is expected?' : 'How much of an expense is it?'}
            isActive={steps[step] === 'amount'}
            isEditing={isEditing}
            isNegative={data.type === 'debit'}
            onNext={handleOnNext}
            value={data.amount}
          />
          <Name
            header="What is this transaction for?"
            isActive={steps[step] === 'name'}
            isEditing={isEditing}
            onNext={handleOnNext}
            value={data.name}
          />
          <Transferee
            header={data.type === 'debit' ? 'Should this be transfered as income to one of the following?' : 'Should this be transfered as an expense from one of the following?'}
            holdings={holdings}
            isActive={steps[step] === 'transferee'}
            isEditing={isEditing}
            onNext={handleOnNext}
            value={data.transferee}
          />
          <Start
            header="When does this transaction occur?"
            isActive={steps[step] === 'start'}
            isEditing={isEditing}
            onNext={handleOnNext}
            value={data.start}
          />
          <Schedule
            header="How often does this transaction repeat?"
            isActive={steps[step] === 'schedule'}
            isEditing={isEditing}
            onNext={handleOnNext}
            value={data.schedule}
          />
          <End
            header="Does this transaction have an end date?"
            isActive={steps[step] === 'end'}
            isEditing={isEditing}
            onNext={handleOnNext}
            value={data.end}
          />
          <Category
            header="Which category does this belong in?"
            isActive={steps[step] === 'category'}
            isEditing={isEditing}
            onNext={handleOnNext}
            value={data.category}
          />
          {budget?.schedule !== 'once' && (
            <Update
              date={date}
              header="Choose how to apply these changes."
              isActive={steps[step] === 'update'}
              onContinue={handleOnContinue}
            />
          )}
          <Submit
            data={data}
            date={date}
            holdings={holdings}
            isActive={steps[step] === 'submit'}
            isEditing={budget !== undefined}
            onEdit={handleOnEdit}
            onSubmit={handleOnSubmit}
            update={update}
          />
          <Actions>
            {(!budget && step > 0 && !isEditing && (step !== steps.length - 1)) && (
              <Action isOutline onClick={handleOnBack}>Back</Action>
            )}
            {budget && step === 0 && !isEditing && (
              <Action onClick={handleOnDelete}>Delete</Action>
            )}
            {(step === 0 && !isEditing) && (
              <Action isOutline onClick={handleOnCancel}>Cancel</Action>
            )}
          </Actions>
        </Ui.Dialog.DialogContent>
      </Ui.Dialog.DialogInner>
    </Ui.Dialog.Dialog>
  );
};
