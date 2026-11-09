'use client';

import { useRouter } from 'next/navigation';
import { startTransition, useActionState, useEffect } from 'react';

import { erase } from '@/actions/holdings/erase';
import { pin } from '@/actions/holdings/pin';
import { useConfirm, useHolding, useStore } from '@/hooks';

export function useModel() {
  const router = useRouter();

  const confirm = useConfirm();
  const { onHolding } = useHolding();
  const { holdings } = useStore();

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
    }
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
  };
}
