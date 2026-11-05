'use client';

import { Footer, Header, Main } from '@/layout';
import Ui from '@/ui'

import Actions from './actions';
import Heading from './heading';
import { useModel } from './model';
import {
  Balance,
  Name,
  Number,
  Pin,
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
    isEditing,
    step,
    steps,
  } = useModel();

  const headers = getHeaders(data.type);
  const placeholder = getPlaceholder(data.type);

  const canGoBack = step > 0 && !isEditing;
  const canCancel = step === 0 && !isEditing;

  return (
    <>
      <Header>
        <Heading
          isEditing={holding !== undefined}
          step={step}
          total={steps.length}
        />
      </Header>
      <Main>
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
        <Pin
          header="Should this be the default upon login?"
          isActive={steps[step] === 'pinned'}
          isEditing={isEditing}
          onNext={handleOnNext}
          value={holding?.pinned || false}
        >
          <Actions
            canGoBack={canGoBack}
            canCancel={canCancel}
            onBack={handleOnBack}
            onCancel={handleOnCancel}
          />
        </Pin>
        <Submit
          data={data}
          isActive={steps[step] === 'submit'}
          isEditing={holding !== undefined}
          onSubmit={handleOnSubmit}
        >
          <Actions
            canGoBack={canGoBack}
            canCancel={canCancel}
            onBack={handleOnBack}
            onCancel={handleOnCancel}
          />
        </Submit>
      </Main>
      <Ui.Components.Divider />
      <Footer>
        <Ui.Components.Branding />
      </Footer>
    </>
  );
};
