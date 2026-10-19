'use client';

import type { Holding } from '@/types';
import Ui from '@/ui';

import {
  Amount,
  Balance,
  Content,
  Navigate,
  Navigation,
  Subheader,
  Title,
} from '../components';

import { useModel } from './model';

type Props = {
  holding?: Holding;
};

export default function Inner({ holding }: Props) {
  const { data, isActive, onClose } = useModel();

  if (!isActive || data === undefined) {
    return null;
  }

  return (
    <>
      <Ui.Dialog.DialogHeader onClose={onClose}>
        <Ui.Dialog.DialogTitle text={data?.day.return.label || ''}>
          <Subheader>
            {data?.day.dateable.display || ''}
          </Subheader>
        </Ui.Dialog.DialogTitle>
      </Ui.Dialog.DialogHeader>
      <Ui.Dialog.DialogContent label="return details">
        <Content>
          <Title>
            USD{' • '}
            {data?.day.return.type}{' • '}
            Monthly
          </Title>
        </Content>
        <Amount
          isNegative={!data?.day.return.isPositive}
          value={data?.day.return.amount}
        />
        <Balance
          amount={String(data?.day.return.amount || 0)}
          isNegative={!data?.day.return.isPositive}
          title={holding?.name || ''}
          value={data?.day?.balance || 0}
        />
        <Navigation>
          <Navigate isOutline onClick={onClose}>
            Close
          </Navigate>
        </Navigation>
      </Ui.Dialog.DialogContent>
    </>
  );
};
