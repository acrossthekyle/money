'use client';

import { startTransition, useActionState, useEffect } from 'react';

import { erase } from '@/actions/budgets/erase';
import {
  useBudget,
  useConfirm,
  useStore,
  useToasts,
} from '@/hooks';
import type { UseConfirmConfig } from '@/types';

export function useDelete() {
  const { onClose } = useBudget();
  const { onConfirm } = useConfirm();
  const { budgets, forecasts } = useStore();
  const { onToast } = useToasts();

  const day = forecasts.selectCalendarDay();

  const [response, action] = useActionState(erase, null);

  useEffect(() => {
    if (response) {
      if (!response.isSuccess) {
        onToast({
          title: 'Oops',
          body: `Something went wrong when trying to erase the transaction. Please try again.`,
        });

        return;
      }

      let message = `All instances of ${response.budget.name} transactions were erased`;

      if (response.wasPurged) {
        budgets.removeBudget(response.budget.id);
      } else {
        budgets.setBudgets([response.budget]);

        message = `${response.budget.name} transaction on ${day?.dateable.display} was removed`;
      }

      forecasts.setForecast();

      onClose();

      onToast({
        title: 'Deleted',
        body: message,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  const handleOnDelete = async (id?: string) => {
    const budget = budgets.selectBudget(id);

    if (!budget || !day || !id) {
      return;
    }

    let config: UseConfirmConfig = {
      target: '#budget-drawer',
    };

    if (budget.schedule === 'once') {
      config = {
        ...config,
        text: `This action cannot be undone. This will permanently delete "${budget.name}".`,
      };
    } else {
      config = {
        ...config,
        text: `This will be a permanent deletion of the "${budget.name}" transaction. This action cannot be undone. Choose an option:`,
        input: 'radio',
        inputOptions: {
          'all': `Entire series (all dates)`,
          'this': `Only ${day?.dateable.display}`,
        },
        inputValidator: (value: string): string => {
          if (!value) {
            return ' ';
          };

          return '';
        },
      };
    }

    const result = await onConfirm(config);

    if (!result.isConfirmed) {
      return;
    }

    startTransition(async () => {
      await action({
        id,
        iso: day.dateable.iso,
        isPurge: result.value === 'all' || budget.schedule === 'once' ? true : false,
      });
    });
  };

  return {
    onDelete: handleOnDelete,
  };
};
