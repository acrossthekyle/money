'use client';

import type { Holding } from '@/types';
import Ui from '@/ui';

import { Action } from '../components';

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
  Update,
} from './steps';
import { getSubtitle } from './utils';

type ActionProps = {
  canGoBack: boolean;
  canCancel: boolean;
  canDelete: boolean;
  onBack: () => void;
  onCancel: () => void;
  onDelete: () => void;
};

function Actions({
  canGoBack,
  canCancel,
  canDelete,
  onBack,
  onCancel,
  onDelete,
}: ActionProps) {
  return (
    <>
      {canGoBack && (
        <Action isOutline onClick={onBack}>Back</Action>
      )}
      {canDelete && (
        <Action onClick={onDelete}>Delete</Action>
      )}
      {canCancel && (
        <Action isOutline onClick={onCancel}>Cancel</Action>
      )}
    </>
  );
};

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

  const canGoBack = !budget && step > 0 && !isEditing;
  const canCancel = (budget ? step === 0 || step === steps.length -1 : step === 0) && !isEditing;
  const canDelete = budget && step === 0 && !isEditing ? true : false;

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
          >
            <Actions
              canGoBack={canGoBack}
              canCancel={canCancel}
              canDelete={canDelete}
              onBack={handleOnBack}
              onCancel={handleOnCancel}
              onDelete={handleOnDelete}
            />
          </Outline>
          <Amount
            header="Choose either Income or Expense as the type of transaction, and then enter the amount"
            isActive={steps[step] === 'amount'}
            isEditing={isEditing}
            isExpense={data.type === 'debit'}
            onNext={handleOnNext}
            value={data.amount}
          >
            <Actions
              canGoBack={canGoBack}
              canCancel={canCancel}
              canDelete={canDelete}
              onBack={handleOnBack}
              onCancel={handleOnCancel}
              onDelete={handleOnDelete}
            />
          </Amount>
          <Name
            header="What is this transaction for?"
            isActive={steps[step] === 'name'}
            isEditing={isEditing}
            onNext={handleOnNext}
            value={data.name}
          >
            <Actions
              canGoBack={canGoBack}
              canCancel={canCancel}
              canDelete={canDelete}
              onBack={handleOnBack}
              onCancel={handleOnCancel}
              onDelete={handleOnDelete}
            />
          </Name>
          <Transferee
            header={data.type === 'debit' ? 'Should this be transfered as income to one of the following?' : 'Should this be transfered as an expense from one of the following?'}
            holdings={holdings}
            isActive={steps[step] === 'transferee'}
            isEditing={isEditing}
            onNext={handleOnNext}
            value={data.transferee}
          >
            <Actions
              canGoBack={canGoBack}
              canCancel={canCancel}
              canDelete={canDelete}
              onBack={handleOnBack}
              onCancel={handleOnCancel}
              onDelete={handleOnDelete}
            />
          </Transferee>
          <Start
            header="When does this transaction occur?"
            isActive={steps[step] === 'start'}
            isEditing={isEditing}
            onNext={handleOnNext}
            value={data.start}
          >
            <Actions
              canGoBack={canGoBack}
              canCancel={canCancel}
              canDelete={canDelete}
              onBack={handleOnBack}
              onCancel={handleOnCancel}
              onDelete={handleOnDelete}
            />
          </Start>
          <Schedule
            header="How often does this transaction repeat?"
            isActive={steps[step] === 'schedule'}
            isEditing={isEditing}
            onNext={handleOnNext}
            value={data.schedule}
          >
            <Actions
              canGoBack={canGoBack}
              canCancel={canCancel}
              canDelete={canDelete}
              onBack={handleOnBack}
              onCancel={handleOnCancel}
              onDelete={handleOnDelete}
            />
          </Schedule>
          <End
            header="Does this transaction have an end date?"
            isActive={steps[step] === 'end'}
            isEditing={isEditing}
            onNext={handleOnNext}
            value={data.end}
          >
            <Actions
              canGoBack={canGoBack}
              canCancel={canCancel}
              canDelete={canDelete}
              onBack={handleOnBack}
              onCancel={handleOnCancel}
              onDelete={handleOnDelete}
            />
          </End>
          <Category
            header="Which category does this belong in?"
            isActive={steps[step] === 'category'}
            isEditing={isEditing}
            onNext={handleOnNext}
            value={data.category}
          >
            <Actions
              canGoBack={canGoBack}
              canCancel={canCancel}
              canDelete={canDelete}
              onBack={handleOnBack}
              onCancel={handleOnCancel}
              onDelete={handleOnDelete}
            />
          </Category>
          {budget?.schedule !== 'once' && (
            <Update
              date={date}
              header="Choose how to apply these changes."
              isActive={steps[step] === 'update'}
              onContinue={handleOnContinue}
            >
              <Actions
                canGoBack={canGoBack}
                canCancel={canCancel}
                canDelete={canDelete}
                onBack={handleOnBack}
                onCancel={handleOnCancel}
                onDelete={handleOnDelete}
              />
            </Update>
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
          >
            <Actions
              canGoBack={canGoBack}
              canCancel={canCancel}
              canDelete={canDelete}
              onBack={handleOnBack}
              onCancel={handleOnCancel}
              onDelete={handleOnDelete}
            />
          </Submit>
        </Ui.Dialog.DialogContent>
      </Ui.Dialog.DialogInner>
    </Ui.Dialog.Dialog>
  );
};
