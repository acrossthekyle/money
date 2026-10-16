'use client';

import tw from '@/styles';
import Ui from '@/ui';

import {
  Action,
  Container,
  Content,
  Header,
  Numbers,
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
  header,
  isActive,
  isEditing,
  onNext,
  value,
}: Props) {
  const { balance, handleOnChange, handleOnNumber, isBlocked } = useModel(value);

  return (
    <Container isActive={isActive}>
      <Header className={styles.header}>{header}</Header>
      <Content className={styles.content}>
        <Ui.Form.Currency onChange={handleOnChange} value={balance} />
      </Content>
      <Numbers
        className={styles.numbers}
        onClick={handleOnNumber}
      />
      <Action
        className={styles.action}
        isBlocked={isBlocked}
        isEditing={isEditing}
        onClick={() => onNext('balance', balance)}
      >
        Next
      </Action>
    </Container>
  );
};

const styles = tw({
  header: `
    order-1
  `,
  numbers: `
    order-2
  `,
  content: `
    order-0
  `,
  action: `
    order-3
  `,
});
