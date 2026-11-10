'use client';

import { startTransition, useActionState, useEffect, useState } from 'react';

import { erase } from '@/actions/budgets/erase';
import { useBudget, useConfirm, useStore, useTransactions } from '@/hooks';
import type { Budget, UseConfirmConfig } from '@/types';

export function useModel() {
  const { onBudget } = useBudget();
  const confirm = useConfirm();
  const { budgets, forecasts } = useStore();
  const { instance, isActive, onBackdrop, onCancel, onClose } = useTransactions();

  const [budget, setBudget] = useState<Budget | null>(null);

  const day = forecasts.selectCalendarDay();

  // @ts-expect-error - is ok
  const [response, action] = useActionState(erase.bind(null, {
    budget: budget as Budget,
    dateIso: day?.dateable.iso || '',
  }), null);

  useEffect(() => {
    if (response !== null) {
      if (response.purged) {
        budgets.removeBudget(response.result.id);
      } else {
        budgets.setBudgets([response.result]);
      }

      forecasts.setForecast();
    }
  }, [budgets, forecasts, response]);

  const handleOnAdd = () => {
    budgets.setId('');

    onClose();

    onBudget();
  };

  const handleOnDelete = async (id: string) => {
    budgets.setId(id);

    const found = budgets.selectBudget();

    if (!found) {
      return;
    }

    setBudget(found);

    let config: UseConfirmConfig = {
      target: '#transactions-drawer',
    };

    if (found?.schedule === 'once') {
      config = {
        ...config,
        text: 'This action cannot be undone. This will permanently delete this budget.',
      };
    } else {
      config = {
        ...config,
        title: 'Are you absolutely sure?',
        text: `This will be a permanent deletion. This action cannot be undone. Choose an option:`,
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

    const result = await confirm(config);

    if (!result.isConfirmed) {
      return;
    }

    if (result.value === 'all') {
      startTransition(async () => {
        // @ts-expect-error - is ok
        await action(true);
      });
    } else {
      startTransition(async () => {
        // @ts-expect-error - is ok
        await action(false);
      });
    }
  };

  const handleOnEdit = (id: string) => {
    budgets.setId(id);

    onClose();

    onBudget();
  };

  return {
    day,
    handleOnAdd,
    handleOnDelete,
    handleOnEdit,
    instance,
    isActive,
    onBackdrop,
    onCancel,
    onClose,
  };
};
