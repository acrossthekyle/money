'use client';

import { useRouter } from 'next/navigation';
import { startTransition, useActionState, useEffect } from 'react';

import { erase } from '@/actions/holdings/erase';
import { useConfirm, useOptions, useStore, useToasts } from '@/hooks';
import type { Holding } from '@/types';

export function useModel(holding?: Holding) {
  const router = useRouter();

  const { onConfirm } = useConfirm();
  const { onClose } = useOptions();
  const { holdings } = useStore();
  const { onToast } = useToasts();

  const [response, action] = useActionState(erase, null);

  useEffect(() => {
    if (response) {
      if (!response.isSuccess) {
        onToast({
          title: 'Oops',
          body: `Something went wrong when deleting "${holding?.name}", please try again`,
        });

        onClose();

        return;
      }

      const remaining = holdings.removeHolding();

      router.push(`/${remaining[0].id}`);

      onToast({
        title: 'Deleted',
        body: `${holding?.name} removed along with all related transactions`,
      });

      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  const handleOnClick = async () => {
    const result = await onConfirm({
      target: '#card-drawer',
      text: `This action cannot be undone. This will permanently delete ${holding?.name} and all of its transactions.`,
    });

    if (!result.isConfirmed) {
      return;
    }

    startTransition(async () => {
      await action({
        id: holding?.id || '',
      });
    });
  };

  return {
    handleOnClick,
  };
}
