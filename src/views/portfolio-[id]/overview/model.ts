'use client';

import { useRouter } from 'next/navigation';
import { startTransition, useActionState } from 'react';

import { erase } from '@/actions/holdings/erase';
import { useConfirm, useHolding } from '@/hooks';
import type { Dateable, Holding } from '@/types';

export function useModel(
  date: Dateable,
  holding: Holding,
) {
  const router = useRouter();

  const confirm = useConfirm();

  const { onHolding } = useHolding();

  const [, action, isPending] = useActionState(erase, holding.id);

  const handleOnDelete = async () => {
    const result = await confirm({
      text: 'This action cannot be undone. This is a permanent deletion and all transactions will be erased.',
    });

    if (!result.isConfirmed) {
      return;
    }

    startTransition(async () => {
      await action();

      router.replace('/');
    });
  };

  const handleOnUpdate = () => {
    onHolding();
  };

  return {
    handleOnDelete,
    handleOnUpdate,
    isPending,
  };
};
