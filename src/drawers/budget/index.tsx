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
  Outline,
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
    handleOnEdit,
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
  } = useModel();

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
              total={steps.length - 1}
            />
          </Ui.Drawer.Header>
          <Outline
            budget={budget}
            data={data}
            holdings={holdings}
            isActive={steps[step] === 'outline'}
            onContinue={handleOnContinue}
            onEdit={handleOnEdit}
          >
            <Actions onCancel={handleOnCancel} />
          </Outline>
          <Amount
            isActive={steps[step] === 'amount'}
            isEditing={isEditing}
            onNext={handleOnNext}
            value={data.amount}
            type={data.type}
          >
            <Actions onCancel={handleOnCancel} />
          </Amount>
          <Name
            isActive={steps[step] === 'name'}
            isEditing={isEditing}
            onNext={handleOnNext}
            value={data.name}
          >
            <Actions onCancel={handleOnCancel} />
          </Name>
          <Transferee
            holdings={holdings}
            isActive={steps[step] === 'transferee'}
            isEditing={isEditing}
            onNext={handleOnNext}
            value={data.transferee}
            type={data.type}
          >
            <Actions onCancel={handleOnCancel} />
          </Transferee>
          <Start
            isActive={steps[step] === 'start'}
            isEditing={isEditing}
            onNext={handleOnNext}
            value={data.start}
          >
            <Actions onCancel={handleOnCancel} />
          </Start>
          <Schedule
            isActive={steps[step] === 'schedule'}
            isEditing={isEditing}
            onNext={handleOnNext}
            value={data.schedule}
          >
            <Actions onCancel={handleOnCancel} />
          </Schedule>
          <End
            isActive={steps[step] === 'end'}
            isEditing={isEditing}
            onNext={handleOnNext}
            value={data.end}
          >
            <Actions onCancel={handleOnCancel} />
          </End>
          <Category
            isActive={steps[step] === 'category'}
            isEditing={isEditing}
            onNext={handleOnNext}
            value={data.category}
          >
            <Actions onCancel={handleOnCancel} />
          </Category>
          {budget?.schedule !== 'once' && (
            <Update
              date={date || undefined}
              isActive={steps[step] === 'update'}
              onSubmit={handleOnSubmit}
            >
              <Actions onCancel={handleOnCancel} />
            </Update>
          )}
          <Submit
            data={data}
            holdings={holdings}
            isActive={steps[step] === 'submit'}
            onEdit={handleOnEdit}
            onSubmit={handleOnSubmit}
          >
            <Actions onCancel={handleOnCancel} />
          </Submit>
        </Ui.Drawer.Content>
      </Ui.Drawer.Inner>
    </Ui.Drawer.Container>
  );
};
