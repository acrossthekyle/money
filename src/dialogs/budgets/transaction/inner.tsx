'use client';

import type { Holding } from '@/types';
import Ui from '@/ui';
import { getBudgetDisplayData } from '@/utils/budgets';

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
import { getAlert } from './utils';

type Props = {
  holding?: Holding;
};

export default function Inner({ holding }: Props) {
  const {
    data,
    handleOnEdit,
    handleOnSwitch,
    isActive,
    onClose,
  } = useModel();

  if (!isActive || data === undefined) {
    return;
  }

  const { amount, isNegative } = getBudgetDisplayData(
    data?.day?.debits || [],
    data?.budget,
  );

  const alert = getAlert(data?.budget, holding);

  return (
    <>
      <Ui.Dialog.DialogHeader onClose={onClose}>
        <Ui.Dialog.DialogTitle text={data?.budget.name || ''}>
          <Subheader>
            {data?.day?.dateable.display || ''}
          </Subheader>
        </Ui.Dialog.DialogTitle>
      </Ui.Dialog.DialogHeader>
      <Ui.Dialog.DialogContent label="transaction details">
        <Content>
          <Amount
            isNegative={isNegative}
            value={Number(amount)}
          />
          <Title>
            {data?.budget.category} • {data?.budget.schedule}
          </Title>
          {!!alert && (
            <Alert>{alert}</Alert>
          )}
        </Content>
        <Navigation>
          {data?.budget.parent !== holding?.id ? (
            <Navigate onClick={handleOnSwitch}>
              Switch to {data?.budget.type === 'credit' ? data?.budget.holding?.to : data?.budget.holding?.from}
            </Navigate>
          ) : (
            <>
              <Navigate
                isPrimary
                onClick={handleOnEdit}
              >
                Edit
              </Navigate>
              <Navigate
                isOutline
                onClick={onClose}
              >
                Close
              </Navigate>
            </>
          )}
        </Navigation>
      </Ui.Dialog.DialogContent>
    </>
  );
};
