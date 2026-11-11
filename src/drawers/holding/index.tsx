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

export default function Drawer() {
  const {
    data,
    handleOnBack,
    handleOnCancel,
    handleOnNext,
    handleOnSubmit,
    holding,
    instance,
    isActive,
    isPending,
    onBackdrop,
    onCancel,
    step,
    steps,
    zone,
  } = useModel();

  const headers = getHeaders(data.type);
  const placeholder = getPlaceholder(data.type);

  const header = `Step ${step + 1} of ${steps.length}`;

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
              zone={zone}
            />
          </Ui.Drawer.Header>
          <Type
            header={header}
            isActive={steps[step] === 'type'}
            onNext={handleOnNext}
            value={data.type}
          >
            <Actions onCancel={handleOnCancel} />
          </Type>
          <Name
            header={header}
            paragraph={headers.name}
            isActive={steps[step] === 'name'}
            onNext={handleOnNext}
            placeholder={placeholder}
            value={data.name}
          >
            <Actions onCancel={handleOnCancel} />
          </Name>
          <Number
            header={header}
            paragraph={headers.number}
            isActive={steps[step] === 'number'}
            onNext={handleOnNext}
            value={data.number}
          >
            <Actions onCancel={handleOnCancel} />
          </Number>
          <Balance
            header={header}
            paragraph={headers.balance}
            isActive={steps[step] === 'balance'}
            onNext={handleOnNext}
            value={data.balance}
          >
            <Actions onCancel={handleOnCancel} />
          </Balance>
          <Rate
            header={header}
            paragraph={headers.rate}
            isActive={steps[step] === 'rate'}
            onNext={handleOnNext}
            value={data.interest}
          >
            <Actions onCancel={handleOnCancel} />
          </Rate>
          <Submit
            data={data}
            isActive={steps[step] === 'submit'}
            isEditing={holding !== undefined}
            isPending={isPending}
            onSubmit={handleOnSubmit}
          >
            <Actions onCancel={handleOnCancel} />
          </Submit>
        </Ui.Drawer.Content>
      </Ui.Drawer.Inner>
    </Ui.Drawer.Container>
  );
};
