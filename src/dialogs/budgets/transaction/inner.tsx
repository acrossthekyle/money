'use client';

import { ALERT_RADIUS } from '@/constants';
import tw from '@/styles';
import type { Holding } from '@/types';
import Ui from '@/ui';
import { getBudgetDisplayData } from '@/utils/budgets';

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
          <Title>
            USD • {data?.budget.category} • {data?.budget.schedule}
          </Title>
        </Content>
        <Amount
          balance={data?.day?.balance || 0}
          isNegative={isNegative}
          value={Number(amount)}
        />
        <Balance
          title={holding?.name || ''}
          value={data?.day?.balance || 0}
        />
        {!!alert && (
          <p className={styles.alert}>
            {alert}
          </p>
        )}
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

const styles = tw({
  icon: `
    w-3.5 h-3.5
    stroke-2

    md:w-3
    md:h-3
  `,
  alert: `
    border border-current/12
    py-3 px-8
    text-xs text-center
    leading-[1.5]
    bg-(--foreground)/6
    uppercase
    font-roboto

    md:text-tiny

    ${ALERT_RADIUS}
  `,
});
