'use client';

import { ArrowLeft } from 'lucide-react';

import tw, { cs } from '@/styles';
import type { Holding } from '@/types';
import Ui from '@/ui';

import { useModel } from './model';
import {
  Balance,
  Name,
  Number,
  Outline,
  Rate,
  Submit,
  Type,
} from './steps';
import {
  getHeaders,
  getPlaceholder,
  getSubtitle,
} from './utils';

type Props = {
  holding?: Holding;
};

export default function Dialog({ holding }: Props) {
  const {
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
  } = useModel(holding);

  const headers = getHeaders(data.type);
  const placeholder = getPlaceholder(data.type);

  return (
    <Ui.Dialog.Dialog
      id="holding-dialog"
      instance={instance}
      isActive={isActive}
      onBackdrop={onBackdrop}
      onCancel={onCancel}
    >
      <Ui.Dialog.DialogInner isActive={isActive}>
        <Ui.Dialog.DialogHeader onClose={handleOnCancel}>
          <button
            className={styles.back(!holding && step > 0)}
            onClick={handleOnBack}
            type="button"
          >
            <ArrowLeft className={styles.arrow} />
          </button>
          <Ui.Dialog.DialogTitle
            text={holding ? 'Edit Portfolio Item' : 'Add to Portfolio'}
          >
            <span className={styles.lid}>
              {getSubtitle(steps, step, holding)}
            </span>
          </Ui.Dialog.DialogTitle>
        </Ui.Dialog.DialogHeader>
        <Ui.Dialog.DialogContent key={holding?.id} label="steps">
          <Outline
            data={data}
            isActive={steps[step] === 'outline'}
            onCancel={handleOnCancel}
            onEdit={handleOnEdit}
          />
          <Type
            header="What kind of portfolio item is this?"
            isActive={steps[step] === 'type'}
            isEditing={isEditing}
            onNext={handleOnNext}
            value={data.type}
          />
          <Name
            header={headers.name}
            isActive={steps[step] === 'name'}
            isEditing={isEditing}
            onNext={handleOnNext}
            placeholder={placeholder}
            value={data.name}
          />
          <Number
            header={headers.number}
            isActive={steps[step] === 'number'}
            isEditing={isEditing}
            onNext={handleOnNext}
            value={data.number}
          />
          <Balance
            header={headers.balance}
            isActive={steps[step] === 'balance'}
            isEditing={isEditing}
            onNext={handleOnNext}
            value={data.balance}
          />
          <Rate
            header={headers.rate}
            isActive={steps[step] === 'rate'}
            isEditing={isEditing}
            onNext={handleOnNext}
            value={data.interest}
          />
          <Submit
            data={data}
            isActive={steps[step] === 'submit'}
            isEditing={holding !== undefined}
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
