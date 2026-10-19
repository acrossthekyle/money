'use client';

import { Banknote, CreditCard, LandPlot, PiggyBank, Egg } from 'lucide-react';

import tw from '@/styles';

import {
  Action,
  Actions,
  Container,
  Header,
  Option,
  Options,
} from '../../../components';

import { useModel } from './model';

type Props = {
  header: string;
  isActive: boolean;
  isEditing: boolean;
  onNext: (key: string, value: string) => void;
  value: string;
};

export default function Section({
  children,
  header,
  isActive,
  isEditing,
  onNext,
  value,
}: React.PropsWithChildren<Props>) {
  const { handleOnChange, isBlocked, type } = useModel(value);

  return (
    <Container isActive={isActive}>
      <Header>{header}</Header>
      <Options>
        <Option
          isActive={type === 'credit_card'}
          onClick={() => handleOnChange('credit_card')}
        >
          <CreditCard className={styles.icon} />
          <span>Credit Card</span>
        </Option>
        <Option
          isActive={type === 'savings'}
          onClick={() => handleOnChange('savings')}
        >
          <PiggyBank className={styles.icon} />
          <span>Savings</span>
        </Option>
        <Option
          isActive={type === 'checking'}
          onClick={() => handleOnChange('checking')}
        >
          <Banknote className={styles.icon} />
          <span>Checking</span>
        </Option>
        <Option
          isActive={type === 'retirement'}
          onClick={() => handleOnChange('retirement')}
        >
          <Egg className={styles.icon} />
          <span>Retirement Holding</span>
        </Option>
        <Option
          isActive={type === 'property'}
          onClick={() => handleOnChange('property')}
        >
          <LandPlot className={styles.icon} />
          <span>Property/Asset</span>
        </Option>
      </Options>
      <Actions>
        {children}
        <Action
          isBlocked={isBlocked}
          isEditing={isEditing}
          onClick={() => onNext('type', type)}
        >
          Next
        </Action>
      </Actions>
    </Container>
  );
};

const styles = tw({
  icon: `
    shrink-0
    w-4.5 h-4.5
    stroke-2

    md:w-4
    md:h-4
  `,
});
