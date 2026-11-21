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
    handleOnCancel,
    handleOnContinue,
    handleOnDelete,
    handleOnEdit,
    handleOnNext,
    handleOnSubmit,
    hasChanged,
    holdings,
    instance,
    isActive,
    isBase,
    isDecked,
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
      isBase={isBase}
      onBackdrop={onBackdrop}
      onCancel={onCancel}
    >
      <Ui.Drawer.Inner isModal>
        <Ui.Drawer.Content isActive={isActive} isDecked={isDecked} isModal>
          <Ui.Drawer.Header>
            <Heading
              budget={budget}
              date={date}
              step={step}
              total={steps.length - 1}
            />
          </Ui.Drawer.Header>
          <Outline
            budget={budget}
            data={data}
            date={date}
            hasChanged={hasChanged}
            holdings={holdings}
            isActive={steps[step] === 'outline'}
            onContinue={handleOnContinue}
            onDelete={handleOnDelete}
            onEdit={handleOnEdit}
          >
            <Actions
              isEditing={isEditing}
              onCancel={handleOnCancel}
              step={step}
            />
          </Outline>
          <Amount
            isActive={steps[step] === 'amount'}
            isEditing={isEditing}
            onNext={handleOnNext}
            value={data.amount}
            type={data.type}
          >
            <Actions
              isEditing={isEditing}
              onCancel={handleOnCancel}
              step={step}
            />
          </Amount>
          <Name
            isActive={steps[step] === 'name'}
            isEditing={isEditing}
            onNext={handleOnNext}
            value={data.name}
          >
            <Actions
              isEditing={isEditing}
              onCancel={handleOnCancel}
              step={step}
            />
          </Name>
          <Transferee
            holdings={holdings}
            isActive={steps[step] === 'transferee'}
            isEditing={isEditing}
            onNext={handleOnNext}
            value={data.transferee}
            type={data.type}
          >
            <Actions
              isEditing={isEditing}
              onCancel={handleOnCancel}
              step={step}
            />
          </Transferee>
          <Start
            isActive={steps[step] === 'start'}
            isEditing={isEditing}
            onNext={handleOnNext}
            value={data.start}
          >
            <Actions
              isEditing={isEditing}
              onCancel={handleOnCancel}
              step={step}
            />
          </Start>
          <Schedule
            isActive={steps[step] === 'schedule'}
            isEditing={isEditing}
            onNext={handleOnNext}
            value={data.schedule}
          >
            <Actions
              isEditing={isEditing}
              onCancel={handleOnCancel}
              step={step}
            />
          </Schedule>
          <End
            isActive={steps[step] === 'end'}
            isEditing={isEditing}
            onNext={handleOnNext}
            value={data.end}
          >
            <Actions
              isEditing={isEditing}
              onCancel={handleOnCancel}
              step={step}
            />
          </End>
          <Category
            isActive={steps[step] === 'category'}
            isEditing={isEditing}
            onNext={handleOnNext}
            value={data.category}
          >
            <Actions
              isEditing={isEditing}
              onCancel={handleOnCancel}
              step={step}
            />
          </Category>
          {budget?.schedule !== 'once' && (
            <Update
              date={date}
              isActive={steps[step] === 'update'}
              onSubmit={handleOnSubmit}
            >
              <Actions
                isEditing={isEditing}
                onCancel={handleOnCancel}
                step={step}
              />
            </Update>
          )}
          <Submit
            data={data}
            holdings={holdings}
            isActive={steps[step] === 'submit'}
            onSubmit={handleOnSubmit}
          >
            <Actions
              isEditing={isEditing}
              onCancel={handleOnCancel}
              step={step}
            />
          </Submit>
        </Ui.Drawer.Content>
      </Ui.Drawer.Inner>
    </Ui.Drawer.Container>
  );
};
