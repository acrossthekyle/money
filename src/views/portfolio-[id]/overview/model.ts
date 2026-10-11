'use client';

import { useRouter } from 'next/navigation';
import { useActionState, useEffect, useState } from 'react';

import { erase } from '@/actions/holdings/erase';
import { useConfirm, useHolding } from '@/hooks';
import type { Dateable, CalendarDay, Holding } from '@/types';

export function useModel(
  date: Dateable,
  holding: Holding,
) {
  const router = useRouter();

  const eraseable = erase.bind(null, holding);

  const [state, action, isPending] = useActionState(eraseable, {
    data: holding,
    hasFailed: false,
    isSuccessful: false,
    message: '',
  } as BudgetFormState);

  const [willDelete, setWillDelete] = useState(false);

  const confirm = useConfirm();

  const { onHolding } = useHolding();

  useEffect(() => {
    if (state?.isSuccessful) {
      router.refresh();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.isSuccessful]);

  const handleOnDelete = async () => {
    const result = await confirm({
      text: 'This action cannot be undone. This is a permanent deletion.',
    });

    if (!result.isConfirmed) {
      return;
    }

    setWillDelete(true);

    setTimeout(() => {
      const form = document.getElementById(`${holding.id}-delete-form`);

      if (form instanceof HTMLFormElement) {
        form.requestSubmit();
      }
    }, 100);
  };

  const handleOnUpdate = () => {
    onHolding();
  };

  return {
    action,
    handleOnDelete,
    handleOnUpdate,
    isPending,
    willDelete,
  };
};
