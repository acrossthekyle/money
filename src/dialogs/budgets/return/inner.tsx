'use client';

import Ui from '@/ui';

import {
  Amount,
  Content,
  Footer,
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
        <Ui.Dialog.DialogTitle text={data?.day.dateable.display || ''}>
          <Subheader>
            USD{' • '}
            {data?.day.return.label}{' • '}
            {Number(data?.holding.interest || 0) > 0 ? '+' : '-'}{data?.holding.interest}%
          </Subheader>
        </Ui.Dialog.DialogTitle>
      </Ui.Dialog.DialogHeader>
      <Ui.Dialog.DialogContent label="return details">
        <Amount
          isNegative={!data?.day.return.isPositive}
          value={data?.day.return.amount}
        />
        <Content>
          <Title>
            {['savings', 'checking', 'credit_card'].includes(data?.holding.type || '') && (
              <>Growth</>
            )}
            {['retirement'].includes(data?.holding.type || '') && (
              <>Return</>
            )}
            {['property'].includes(data?.holding.type || '') && (
              <>Worth</>
            )}
          </Title>
          <Footer>Projected {data?.day.return.label}</Footer>
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
