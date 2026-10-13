'use client';

import { ArrowLeft } from 'lucide-react';

import tw from '@/styles';
import type { Holding } from '@/types';
import Ui from '@/ui';

import { useModel } from './model';
import {
  Amount,
  Name,
  Outline,
  Submit,
  Transferee,
  Type,
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
    handleOnBack,
    handleOnCancel,
    handleOnEdit,
    handleOnNext,
    handleOnSubmit,
    instance,
    isActive,
    isEditing,
    isPending,
    onBackdrop,
    onCancel,
    step,
    steps,
  } = useModel();

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
            className={styles.back(!budget && step > 0)}
            onClick={handleOnBack}
            type="button"
          >
            <ArrowLeft className={styles.arrow} />
          </button>
          <Ui.Dialog.DialogTitle
            text={budget ? 'Edit Transaction' : 'Add Transaction'}
          >
            <span className={styles.lid}>
              {getSubtitle(steps, step, budget)}
            </span>
          </Ui.Dialog.DialogTitle>
        </Ui.Dialog.DialogHeader>
        <Ui.Dialog.DialogContent key={budget?.id} label="steps">
          <Outline
            data={data}
            isActive={steps[step] === 'outline'}
            onCancel={handleOnCancel}
            onEdit={handleOnEdit}
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
            header={data.type === 'debit' ? 'Transfer as income to' : 'Transfer as expense from'}
            holdings={holdings}
            isActive={steps[step] === 'transferee'}
            isEditing={isEditing}
            onNext={handleOnNext}
            value={data.transferee}
          />
          <Submit
            data={data}
            isActive={steps[step] === 'submit'}
            isEditing={budget !== undefined}
            onEdit={handleOnEdit}
            onSubmit={handleOnSubmit}
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
    w-4 h-4
    stroke-2
  `,
  lid: `
    mt-0.25
    text-tiny
    uppercase
    tracking-wide
    font-roboto
  `,
});
