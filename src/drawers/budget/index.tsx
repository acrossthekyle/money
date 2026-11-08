'use client';

import Ui from '@/ui';

import Actions from './actions';
import Heading from './heading';
import { useModel } from './model';
import {
  Amount,
  Category,
  End,
  Name,
  Schedule,
  Submit,
  Start,
  Transferee,
  Update,
} from './steps';

export default function View() {
  const {
    budget,
    data,
    date,
    handleOnBack,
    handleOnCancel,
    handleOnContinue,
    handleOnNext,
    handleOnSubmit,
    holdings,
    instance,
    isActive,
    isEditing,
    onBackdrop,
    onCancel,
    step,
    steps,
    update,
  } = useModel();

  const canGoBack = step > 0 && !isEditing;
  const canCancel = step === 0 && !isEditing;

  return (
    <Ui.Drawer.Container
      id="budget-drawer"
      instance={instance}
      isActive={isActive}
      onBackdrop={onBackdrop}
      onCancel={onCancel}
    >
      <Ui.Drawer.Inner isActive={isActive}>
        <Ui.Drawer.Content>
          <Ui.Drawer.Header>
            <Heading
              isEditing={budget !== undefined}
              step={step + 1}
              total={steps.length}
            />
          </Ui.Drawer.Header>
          <Amount
            header="Choose either Income or Expense as the type of transaction, and then enter the amount"
            isActive={steps[step] === 'amount'}
            isEditing={isEditing}
            onNext={handleOnNext}
            value={data.amount}
            type={data.type}
          >
            <Actions
              canGoBack={canGoBack}
              canCancel={canCancel}
              onBack={handleOnBack}
              onCancel={handleOnCancel}
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
              onBack={handleOnBack}
              onCancel={handleOnCancel}
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
              onBack={handleOnBack}
              onCancel={handleOnCancel}
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
              onBack={handleOnBack}
              onCancel={handleOnCancel}
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
              onBack={handleOnBack}
              onCancel={handleOnCancel}
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
              onBack={handleOnBack}
              onCancel={handleOnCancel}
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
              onBack={handleOnBack}
              onCancel={handleOnCancel}
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
                onBack={handleOnBack}
                onCancel={handleOnCancel}
              />
            </Update>
          )}
          <Submit
            data={data}
            date={date}
            holdings={holdings}
            isActive={steps[step] === 'submit'}
            isEditing={budget !== undefined}
            onSubmit={handleOnSubmit}
            update={update}
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
