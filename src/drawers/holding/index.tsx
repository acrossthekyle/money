'use client';

import Ui from '@/ui';

import Actions from './actions';
import Heading from './heading';
import { useModel } from './model';
import {
  Balance,
  Interest,
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
    handleOnBack,
    handleOnCancel,
    handleOnEdit,
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
    zone,
  } = useModel();

  const headers = getHeaders(data.type);
  const placeholder = getPlaceholder(data.type);

  return (
    <Ui.Drawer.Container
      id="holding-drawer"
      instance={instance}
      isActive={isActive}
      onBackdrop={onBackdrop}
      onCancel={onCancel}
    >
      <Ui.Drawer.Inner>
        <Ui.Drawer.Content isActive={isActive}>
          <Ui.Drawer.Header>
            <Heading
              holding={holding}
              onBack={handleOnBack}
              step={step}
              total={steps.length - 1}
            />
          </Ui.Drawer.Header>
          <Outline
            data={data}
            holding={holding}
            isActive={steps[step] === 'outline'}
            onSubmit={handleOnSubmit}
            onEdit={handleOnEdit}
            zone={zone}
          >
            <Actions onCancel={handleOnCancel} />
          </Outline>
          <Type
            isActive={steps[step] === 'type'}
            isEditing={isEditing}
            onNext={handleOnNext}
            value={data.type}
          >
            <Actions onCancel={handleOnCancel} />
          </Type>
          <Name
            label={headers.name}
            isActive={steps[step] === 'name'}
            isEditing={isEditing}
            onNext={handleOnNext}
            placeholder={placeholder}
            value={data.name}
          >
            <Actions onCancel={handleOnCancel} />
          </Name>
          <Balance
            label={headers.balance}
            isActive={steps[step] === 'balance'}
            isEditing={isEditing}
            onNext={handleOnNext}
            value={data.balance}
          >
            <Actions onCancel={handleOnCancel} />
          </Balance>
          <Interest
            label={headers.interest}
            isActive={steps[step] === 'interest'}
            isEditing={isEditing}
            onNext={handleOnNext}
            value={data.interest}
          >
            <Actions onCancel={handleOnCancel} />
          </Interest>
          <Submit
            data={data}
            isActive={steps[step] === 'submit'}
            isPending={isPending}
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
