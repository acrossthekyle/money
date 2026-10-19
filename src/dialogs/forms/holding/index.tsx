'use client';

import Ui from '@/ui';

import { Action } from '../components';

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

type ActionProps = {
  canGoBack: boolean;
  canCancel: boolean;
  onBack: () => void;
  onCancel: () => void;
};

function Actions({ canGoBack, canCancel, onBack, onCancel }: ActionProps) {
  return (
    <>
      {canGoBack && (
        <Action isOutline onClick={onBack}>Back</Action>
      )}
      {canCancel && (
        <Action isOutline onClick={onCancel}>Cancel</Action>
      )}
    </>
  );
};

export default function Dialog() {
  const {
    data,
    handleOnBack,
    handleOnCancel,
    handleOnEdit,
    handleOnNext,
    handleOnSubmit,
    holding,
    instance,
    isActive,
    isEditing,
    onBackdrop,
    onCancel,
    step,
    steps,
  } = useModel();

  const headers = getHeaders(data.type);
  const placeholder = getPlaceholder(data.type);

  const canGoBack = !holding && step > 0 && !isEditing;
  const canCancel = (holding ? step === 0 || step === steps.length -1 : step === 0) && !isEditing;

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
          <Ui.Dialog.DialogTitle text={`${holding ? 'Edit' : 'Add'} Portfolio Item`}>
            <Ui.Dialog.DialogTitleLid>
              {getSubtitle(steps, step, holding)}
            </Ui.Dialog.DialogTitleLid>
          </Ui.Dialog.DialogTitle>
        </Ui.Dialog.DialogHeader>
        <Ui.Dialog.DialogContent key={holding?.id} label="steps">
          <Outline
            data={data}
            isActive={steps[step] === 'outline'}
            onEdit={handleOnEdit}
          >
            <Actions
              canGoBack={canGoBack}
              canCancel={canCancel}
              onBack={handleOnBack}
              onCancel={handleOnCancel}
            />
          </Outline>
          <Type
            header="What kind of portfolio item is this?"
            isActive={steps[step] === 'type'}
            isEditing={isEditing}
            onNext={handleOnNext}
            value={data.type}
          >
            <Actions
              canGoBack={canGoBack}
              canCancel={canCancel}
              onBack={handleOnBack}
              onCancel={handleOnCancel}
            />
          </Type>
          <Name
            header={headers.name}
            isActive={steps[step] === 'name'}
            isEditing={isEditing}
            onNext={handleOnNext}
            placeholder={placeholder}
            value={data.name}
          >
            <Actions
              canGoBack={canGoBack}
              canCancel={canCancel}
              onBack={handleOnBack}
              onCancel={handleOnCancel}
            />
          </Name>
          <Number
            header={headers.number}
            isActive={steps[step] === 'number'}
            isEditing={isEditing}
            onNext={handleOnNext}
            value={data.number}
          >
            <Actions
              canGoBack={canGoBack}
              canCancel={canCancel}
              onBack={handleOnBack}
              onCancel={handleOnCancel}
            />
          </Number>
          <Balance
            header={headers.balance}
            isActive={steps[step] === 'balance'}
            isEditing={isEditing}
            onNext={handleOnNext}
            value={data.balance}
          >
            <Actions
              canGoBack={canGoBack}
              canCancel={canCancel}
              onBack={handleOnBack}
              onCancel={handleOnCancel}
            />
          </Balance>
          <Rate
            header={headers.rate}
            isActive={steps[step] === 'rate'}
            isEditing={isEditing}
            onNext={handleOnNext}
            value={data.interest}
          >
            <Actions
              canGoBack={canGoBack}
              canCancel={canCancel}
              onBack={handleOnBack}
              onCancel={handleOnCancel}
            />
          </Rate>
          <Submit
            data={data}
            isActive={steps[step] === 'submit'}
            isEditing={holding !== undefined}
            onEdit={handleOnEdit}
            onSubmit={handleOnSubmit}
          >
            <Actions
              canGoBack={canGoBack}
              canCancel={canCancel}
              onBack={handleOnBack}
              onCancel={handleOnCancel}
            />
          </Submit>
        </Ui.Dialog.DialogContent>
      </Ui.Dialog.DialogInner>
    </Ui.Dialog.Dialog>
  );
};
