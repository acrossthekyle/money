'use client';

import Ui from '@/ui';

import {
  Alert,
  Amount,
  Content,
  Navigate,
  Navigation,
  Subheader,
  Title,
} from '../components';

import { useModel } from './model';

export default function Inner() {
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
          <Amount
            isNegative={!data?.day.return.isPositive}
            value={data?.day.return.amount || 0}
          />
          <Title>
            {data?.day.return.type} • Monthly
          </Title>
          <Alert>
            This is an estimate.<br />
            Actual {data?.day.return.label} {data?.day.return.type} may vary.
          </Alert>
        </Content>
        <Navigation>
          <Navigate isOutline onClick={onClose}>
            Close
          </Navigate>
        </Navigation>
      </Ui.Dialog.DialogContent>
    </>
  );
};
