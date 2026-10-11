'use client';

import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect, useState } from 'react';

import { DATE_DISPLAY } from '@/constants';
import { useBudget, useConfirm } from '@/hooks';
import { put } from '@/actions/budgets/put';
import type {
  Budget,
  Dateable,
  FormStateError,
  BudgetFormState,
} from '@/types';

export function useModel(
  date: Dateable,
  parent: string,
  budget?: Budget,
) {
  const router = useRouter();

  const putable = put.bind(null, budget || null);

  const [state, action, isPending] = useActionState(putable, {
    data: budget,
    hasFailed: false,
    isSuccessful: false,
    message: '',
  } as BudgetFormState);

  const [type, setType] = useState('debit');
  const [errors, setErrors] = useState<FormStateError[]>([]);
  const [update, setUpdate] = useState('');

  const { instance, isActive, onBackdrop, onCancel, onClose } = useBudget();
  const confirm = useConfirm();

  useEffect(() => {
    if (budget) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setType(budget.type);
      setUpdate('');
    }
  }, [budget]);

  useEffect(() => {
    if (state?.isSuccessful) {
      onClose();

      router.refresh();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.isSuccessful]);

  useEffect(() => {
    if (state?.hasFailed && (state?.errors || !!state?.message)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setErrors(state?.errors || [{ field: '', error: state?.message }]);
    }
  }, [state?.hasFailed, state?.errors, state?.message]);

  const handleOnType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setType(event.target.value);
  };

  const handleOnContinue = async () => {
    if (budget?.schedule === 'once') {
      setUpdate('this');
    } else {
      const result = await confirm({
        target: '#budget-dialog',
        title: 'Are you absolutely sure?',
        text: 'This will be a permanent update. This action cannot be undone. Choose which dates to apply these changes to:',
        input: 'radio',
        inputOptions: {
          'all': `All past, present, and future dates`,
          'this': `Only ${format(date.date, DATE_DISPLAY)}`,
          'prospective': `From ${format(date.date, DATE_DISPLAY)} onwards`,
          'future': `After ${format(date.date, DATE_DISPLAY)}`,
        },
        inputValidator: (value: string): string => {
          if (!value) {
            return ' ';
          };

          return '';
        },
      });

      if (!result.isConfirmed) {
        return;
      }

      setUpdate(result.value);
    }

    setTimeout(() => {
      const form = document.getElementById('budget-form');

      if (form instanceof HTMLFormElement) {
        form.requestSubmit();
      }
    }, 100);
  };

  const handleOnCancel = () => {
    onClose();
  };

  return {
    action,
    data: state?.data ?? budget,
    errors,
    handleOnCancel,
    handleOnContinue,
    handleOnType,
    instance,
    isActive,
    isPending,
    onBackdrop,
    onCancel,
    onClose,
    type,
    update,
  };
};
