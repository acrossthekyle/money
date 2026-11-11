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
    onBackdrop,
    onCancel,
    step,
    steps,
    update,
  } = useModel();

  const header = `Step ${step + 1} of ${steps.length}`;

  return (
    <Ui.Drawer.Container
      id="budget-drawer"
      instance={instance}
      isActive={isActive}
      onBackdrop={onBackdrop}
      onCancel={onCancel}
    >
      <Ui.Drawer.Inner>
        <Ui.Drawer.Content isActive={isActive}>
          <Ui.Drawer.Header>
            <Heading
              budget={budget}
              onBack={handleOnBack}
              step={step}
            />
          </Ui.Drawer.Header>
          <Amount
            header={header}
            isActive={steps[step] === 'amount'}
            onNext={handleOnNext}
            value={data.amount}
            type={data.type}
          >
            <Actions onCancel={handleOnCancel} />
          </Amount>
          <Name
            header={header}
            isActive={steps[step] === 'name'}
            onNext={handleOnNext}
            value={data.name}
          >
            <Actions onCancel={handleOnCancel} />
          </Name>
          <Transferee
            header={header}
            holdings={holdings}
            isActive={steps[step] === 'transferee'}
            onNext={handleOnNext}
            value={data.transferee}
            type={data.type}
          >
            <Actions onCancel={handleOnCancel} />
          </Transferee>
          <Start
            header={header}
            isActive={steps[step] === 'start'}
            onNext={handleOnNext}
            value={data.start}
          >
            <Actions onCancel={handleOnCancel} />
          </Start>
          <Schedule
            header={header}
            isActive={steps[step] === 'frequency'}
            onNext={handleOnNext}
            value={data.schedule}
          >
            <Actions onCancel={handleOnCancel} />
          </Schedule>
          <End
            header={header}
            isActive={steps[step] === 'end'}
            onNext={handleOnNext}
            value={data.end}
          >
            <Actions onCancel={handleOnCancel} />
          </End>
          <Category
            header={header}
            isActive={steps[step] === 'category'}
            onNext={handleOnNext}
            value={data.category}
          >
            <Actions onCancel={handleOnCancel} />
          </Category>
          {budget?.schedule !== 'once' && (
            <Update
              date={date || undefined}
              header={header}
              isActive={steps[step] === 'dates'}
              onContinue={handleOnContinue}
            >
              <Actions onCancel={handleOnCancel} />
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
            <Actions onCancel={handleOnCancel} />
          </Submit>
        </Ui.Drawer.Content>
      </Ui.Drawer.Inner>
    </Ui.Drawer.Container>
  );
};
