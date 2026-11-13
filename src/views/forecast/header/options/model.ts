'use client';

import { useRouter } from 'next/navigation';
import { startTransition, useActionState, useEffect } from 'react';

import { erase } from '@/actions/holdings/erase';
import { pin } from '@/actions/holdings/pin';
import { useConfirm, useHolding, useStore, useToasts } from '@/hooks';
import type { Holding } from '@/types';

export function useModel(holding: Holding, pinned: string) {
  const router = useRouter();

  const confirm = useConfirm();
  const { onHolding } = useHolding();
  const { holdings } = useStore();
  const { onToast } = useToasts();

  const id = holdings.selectId();

  const [, eraseable] = useActionState(
    erase.bind(null, id),
    null,
  );

  const [response, pinnable] = useActionState(
    pin.bind(null, id),
    null,
  );

  useEffect(() => {
    if (response !== null) {
      holdings.setPinned(response);

      onToast({
        title: response === holding.id ? 'Pinned' : 'Unpinned',
        body: response === holding.id ? 'This is now the default upon login.' : 'This is no longer the default upon login.',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  const handleOnDelete = async () => {
    const result = await confirm({
      text: 'This action cannot be undone. This will permanently delete this portfolio item and all of its transactions.',
    });

    if (!result.isConfirmed) {
      return;
    }

    startTransition(async () => {
      // @ts-expect-error - is ok
      await eraseable(true);

      onToast({
        title: `${holding.name} Deleted`,
        body: 'Removed from portfolio along with all related transactions',
      });

      const remaining = holdings.removeHolding(id);

      router.push(`/${remaining[0].id}`);
    });
  };

  const handleOnEdit = () => {
    holdings.setNullable(false);

    onHolding();
  };

  const handleOnPin = () => {
    startTransition(async () => {
      // @ts-expect-error - is ok
      await pinnable(id);
    });
  };

  return {
    handleOnDelete,
    handleOnEdit,
    handleOnPin,
    isPinned: pinned === holding.id,
  };
}
