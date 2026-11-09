'use client';

import Ui from '@/ui'

import Actions from './actions';
import Heading from './heading';
import { useModel } from './model';
import {
  Balance,
  Name,
  Number,
  Rate,
  Submit,
  Type,
} from './steps';
import {
  getHeaders,
  getPlaceholder,
} from './utils';

export default function View() {
  const {
    data,
    handleOnBack,
    handleOnCancel,
    handleOnNext,
    handleOnSubmit,
    holding,
    instance,
    isActive,
    isEditing,
    isPending,
    onBackdrop,
    onCancel,
    step,
    steps,
  } = useModel();

  const headers = getHeaders(data.type);
  const placeholder = getPlaceholder(data.type);

  const canGoBack = step > 0 && !isEditing;
  const canCancel = step === 0 && !isEditing;

  const header = `Step ${step + 1} of ${steps.length}`;

  return (
    <Ui.Drawer.Container
      id="holding-drawer"
      instance={instance}
      isActive={isActive}
      onBackdrop={onBackdrop}
      onCancel={onCancel}
    >
      <Ui.Drawer.Inner isActive={isActive}>
        <Ui.Drawer.Content>
          <Ui.Drawer.Header>
            <Heading isEditing={holding !== undefined} />
          </Ui.Drawer.Header>
          <Type
            header={header}
            isActive={steps[step] === 'type'}
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
            header={header}
            paragraph={headers.name}
            isActive={steps[step] === 'name'}
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
            header={header}
            paragraph={headers.number}
            isActive={steps[step] === 'number'}
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
            header={header}
            paragraph={headers.balance}
            isActive={steps[step] === 'balance'}
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
            header={header}
            paragraph={headers.rate}
            isActive={steps[step] === 'rate'}
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
            isPending={isPending}
            onSubmit={handleOnSubmit}
          >
            <Actions
              canGoBack={canGoBack}
              canCancel={canCancel}
              onBack={handleOnBack}
              onCancel={handleOnCancel}
            />
          </Submit>
        </Ui.Drawer.Content>
      </Ui.Drawer.Inner>
    </Ui.Drawer.Container>
  );
};
