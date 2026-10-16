'use client';

import { ArrowLeft } from 'lucide-react';

import tw from '@/styles';
import type { Holding } from '@/types';
import Ui from '@/ui';

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
          <button
            className={styles.back(step > 0)}
            onClick={handleOnBack}
            type="button"
          >
            <ArrowLeft className={styles.arrow} />
          </button>
          <span className={styles.eyebrow}>
            {getSubtitle(steps, step, budget)}
          </span>
          <Ui.Dialog.DialogTitle text={`${budget ? 'Edit' : 'Add'} Transaction`}>
            <span className={styles.lid}>
              {date?.display}
            </span>
          </Ui.Dialog.DialogTitle>
        </Ui.Dialog.DialogHeader>
        <Ui.Dialog.DialogContent key={budget?.id} label="steps">
          <Outline
            data={data}
            date={date}
            holdings={holdings}
            isActive={steps[step] === 'outline'}
            onCancel={handleOnCancel}
            onEdit={handleOnEdit}
            update={update}
          />
          <Amount
            header="Enter an amount"
            isActive={steps[step] === 'amount'}
            isEditing={isEditing}
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
          <Type
            header="Choose a type"
            isActive={steps[step] === 'type'}
            isEditing={isEditing}
            onNext={handleOnNext}
            value={data.type}
          />
          <Transferee
            header={data.type === 'debit' ? 'Should this transaction be a transfer as income to one of the below portfolio items' : 'Should this transaction be a transfer as an expense from one of the below portfolio items'}
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
            header="Which category does this transaction belong in?"
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
        </Ui.Dialog.DialogContent>
      </Ui.Dialog.DialogInner>
    </Ui.Dialog.Dialog>
  );
};

const styles = tw({
  back: (canGoBack: boolean) => tw(`
    absolute top-4 left-4
    select-none

    motion-safe:duration-300

    ${canGoBack ? 'opacity-100' : 'opacity-0'}
  `),
  arrow: `
    w-5 h-5
    stroke-2

    md:w-4
    md:h-4
  `,
  eyebrow: `
    mt-2
    text-tiny text-center
    uppercase
    tracking-wide
    font-roboto

    md:text-xtiny
  `,
  lid: `
    mt-0.25
    text-xs text-center
    uppercase
    tracking-wide
    font-roboto

    md:text-tiny
  `,
});
