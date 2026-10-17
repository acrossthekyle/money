'use client';

import tw from '@/styles';
import Ui from '@/ui';
import { getBudgetDisplayData } from '@/utils/budgets';

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
  const {
    data,
    handleOnDelete,
    handleOnEdit,
    isActive,
    isPending,
    onClose,
  } = useModel();

  if (!isActive || data === undefined) {
    return;
  }

  const { amount, isNegative } = getBudgetDisplayData(
    data?.day?.debits || [],
    data?.budget,
  );

  const isNotAssignedToHolding = data?.budget.parent !== data?.holding.id;

  return (
    <>
      <Ui.Dialog.DialogHeader onClose={onClose}>
        <Ui.Dialog.DialogTitle text={data?.day?.dateable.display || ''}>
          <Subheader>
            USD • {data?.budget.category} • {data?.budget.schedule}
          </Subheader>
        </Ui.Dialog.DialogTitle>
      </Ui.Dialog.DialogHeader>
      <Ui.Dialog.DialogContent label="transaction details">
        <Amount isNegative={isNegative} value={amount} />
        <Content>
          <Title>{data?.budget.name}</Title>
          {data?.budget.holding?.from !== data?.budget.holding?.to && (
            <Footer>
              Debit from {data?.budget.holding?.from} as credit to {data?.budget.holding?.to}
            </Footer>
          )}
          {data?.budget.holding?.from === data?.budget.holding?.to && (
            <Footer>
              {data?.budget.type}
            </Footer>
          )}
        </Content>
        {isNotAssignedToHolding && (
          <p className={styles.alert}>
            This transaction is managed under a different portfolio item.
          </p>
        )}
        <Navigation>
          {isNotAssignedToHolding ? (
            <Navigate
              href={`/portfolio/${data?.budget.parent}`}
              onClick={onClose}
            >
              Switch to {data?.budget.type === 'credit' ? data?.budget.holding?.to : data?.budget.holding?.from}
            </Navigate>
          ) : (
            <>
              <Navigate
                isDisabled={isPending}
                onClick={handleOnDelete}
              >
                Delete
              </Navigate>
              <Navigate
                isDisabled={isPending}
                isOutline
                onClick={onClose}
              >
                Cancel
              </Navigate>
              <Navigate
                isDisabled={isPending}
                isPrimary
                onClick={handleOnEdit}
              >
                Edit
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
    rounded-xl
    p-3
    text-sm text-center
    leading-[1.5]

    md:text-xs
  `,
});
