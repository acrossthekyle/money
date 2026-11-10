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

export default function Drawer() {
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
    onClose,
    step,
    steps,
    update,
  } = useModel();

  const canGoBack = step > 0 && !isEditing;
  const canCancel = step === 0 && !isEditing;

  const header = `Step ${step + 1} of ${steps.length}`;

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
          <Ui.Drawer.Header onClose={onClose}>
            <Heading budget={budget} />
          </Ui.Drawer.Header>
          <Amount
            header={header}
            isActive={steps[step] === 'amount'}
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
            header={header}
            isActive={steps[step] === 'name'}
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
            header={header}
            holdings={holdings}
            isActive={steps[step] === 'transferee'}
            onNext={handleOnNext}
            value={data.transferee}
            type={data.type}
          >
            <Actions
              canGoBack={canGoBack}
              canCancel={canCancel}
              onBack={handleOnBack}
              onCancel={handleOnCancel}
            />
          </Transferee>
          <Start
            header={header}
            isActive={steps[step] === 'start'}
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
            header={header}
            isActive={steps[step] === 'schedule'}
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
            header={header}
            isActive={steps[step] === 'end'}
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
            header={header}
            isActive={steps[step] === 'category'}
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
              date={date || undefined}
              header={header}
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
            date={date || undefined}
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
