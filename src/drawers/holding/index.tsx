'use client';

import Ui from '@/ui';

import Actions from './actions';
import Heading from './heading';
import { useModel } from './model';
import {
  Balance,
  Interest,
  Limit,
  Name,
  Outline,
  Submit,
  Type,
} from './steps';
import {
  getHeaders,
  getPlaceholder,
} from './utils';

export default function Drawer() {
  const {
    data,
    handleOnCancel,
    handleOnEdit,
    handleOnNext,
    handleOnSubmit,
    hasChanged,
    holding,
    instance,
    isActive,
    isBase,
    isDecked,
    isEditing,
    isPending,
    onBackdrop,
    onCancel,
    step,
    steps,
    zone,
  } = useModel();

  const headers = getHeaders(data.type);
  const placeholder = getPlaceholder(data.type);

  return (
    <Ui.Drawer.Container
      id="holding-drawer"
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
              holding={holding}
              step={step}
              total={steps.length - 1}
            />
          </Ui.Drawer.Header>
          <Outline
            data={data}
            hasChanged={hasChanged}
            holding={holding}
            isActive={steps[step] === 'outline'}
            onEdit={handleOnEdit}
            onSubmit={handleOnSubmit}
            zone={zone}
          >
            <Actions
              isEditing={isEditing}
              onCancel={handleOnCancel}
              step={step}
            />
          </Outline>
          <Type
            isActive={steps[step] === 'type'}
            isEditing={isEditing}
            onNext={handleOnNext}
            value={data.type}
          >
            <Actions
              isEditing={isEditing}
              onCancel={handleOnCancel}
              step={step}
            />
          </Type>
          <Name
            label={headers.name}
            isActive={steps[step] === 'name'}
            isEditing={isEditing}
            onNext={handleOnNext}
            placeholder={placeholder}
            value={data.name}
          >
            <Actions
              isEditing={isEditing}
              onCancel={handleOnCancel}
              step={step}
            />
          </Name>
          <Balance
            label={headers.balance}
            isActive={steps[step] === 'balance'}
            isEditing={isEditing}
            onNext={handleOnNext}
            value={data.balance}
          >
            <Actions
              isEditing={isEditing}
              onCancel={handleOnCancel}
              step={step}
            />
          </Balance>
          <Limit
            isActive={steps[step] === 'limit'}
            isEditing={isEditing}
            onNext={handleOnNext}
            value={data.limit}
          >
            <Actions
              isEditing={isEditing}
              onCancel={handleOnCancel}
              step={step}
            />
          </Limit>
          <Interest
            label={headers.interest}
            isActive={steps[step] === 'interest'}
            isEditing={isEditing}
            onNext={handleOnNext}
            value={data.interest}
          >
            <Actions
              isEditing={isEditing}
              onCancel={handleOnCancel}
              step={step}
            />
          </Interest>
          <Submit
            data={data}
            isActive={steps[step] === 'submit'}
            isPending={isPending}
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
