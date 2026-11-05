'use client';

import { useRouter } from 'next/navigation';
import { startTransition, useActionState, useCallback } from 'react';
import { useSwipeable } from 'react-swipeable';

import { useConfirm } from '@/hooks';
import { erase } from '@/actions/holdings/erase';

export function useModel(
  id: string,
  isSwiped: boolean,
  onClick: () => void,
  onSwipe: (id: string) => void,
) {
  const router = useRouter();

  const confirm = useConfirm();

  const swipers = useSwipeable({
    trackMouse: true,
    onSwipedLeft: () => {
      onSwipe('');
    },
    onSwipedRight: () => {
      onSwipe(id);
    },
  });

  const [, action] = useActionState(
    erase.bind(null, id),
    null,
  );

  const handleOnDelete = async () => {
    const result = await confirm({
      text: 'This action cannot be undone. This will permanently delete this portfolio item and all of its transactions.',
    });

    if (!result.isConfirmed) {
      return;
    }

    startTransition(async () => {
      // @ts-expect-error - is ok
      await action(true);

      router.refresh();
    });
  };

  const handleOnClick = useCallback((event: React.MouseEvent<HTMLAnchorElement>) => {
    if (isSwiped) {
      event.preventDefault();

      onSwipe('');

      return;
    }

    onClick();
  }, [isSwiped, onClick, onSwipe]);

  return {
    handleOnClick,
    handleOnDelete,
    swipers,
  };
};
