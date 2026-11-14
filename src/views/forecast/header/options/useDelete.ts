'use client';

import { useRouter } from 'next/navigation';
import { startTransition, useActionState, useEffect } from 'react';

import { erase } from '@/actions/holdings/erase';
import { useConfirm, useStore, useToasts } from '@/hooks';
import type { Holding } from '@/types';

export function useDelete(holding: Holding) {
  const router = useRouter();

  const { onConfirm } = useConfirm();
  const { holdings } = useStore();
  const { onToast } = useToasts();

  const [response, action] = useActionState(erase, null);

  useEffect(() => {
    if (response) {
      if (!response.isSuccess) {
        onToast({
          title: 'Oops',
          body: `Something went wrong when deleting ${holding.name}, please try again`,
        });

        return;
      }

      const remaining = holdings.removeHolding(holding.id);

      router.push(`/${remaining[0].id}`);

      onToast({
        title: 'Deleted',
        body: `${holding.name} removed along with all related transactions`,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  const handleOnDelete = async () => {
    const result = await onConfirm({
      text: `This action cannot be undone. This will permanently delete ${holding.name} and all of its transactions.`,
    });

    if (!result.isConfirmed) {
      return;
    }

    startTransition(async () => {
      await action({
        id: holding.id,
      });
    });
  };

  return {
    onDelete: handleOnDelete,
  };
}
