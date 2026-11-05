'use client';

import { useRouter } from 'next/navigation';
import { startTransition, useActionState } from 'react';
import { useSwipeable } from 'react-swipeable';

import { erase } from '@/actions/budgets/erase';
import { useConfirm } from '@/hooks';
import type { Budget, Dateable, UseConfirmConfig } from '@/types';

export function useModel(
  budget: Budget | undefined,
  date: Dateable,
  isSwiped: boolean,
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
      onSwipe(budget?.id || '0');
    },
  });

  // @ts-expect-error - is ok
  const [, action] = useActionState(erase.bind(null, {
    budget,
    dateIso: date.iso,
  }), null);

  const handleOnDelete = async () => {
    let config: UseConfirmConfig = {};

    if (budget?.schedule === 'once') {
      config = {
        text: 'This action cannot be undone. This will permanently delete this budget.',
      };
    } else {
      config = {
        title: 'Are you absolutely sure?',
        text: `This will be a permanent deletion. This action cannot be undone. Choose an option:`,
        input: 'radio',
        inputOptions: {
          'all': `Entire series (all dates)`,
          'this': `Only ${date.display}`,
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

        router.refresh();
      });
    } else {
      startTransition(async () => {
        // @ts-expect-error - is ok
        await action(false);

        router.refresh();
      });
    }
  };

  return {
    handleOnDelete,
    swipers,
  };
};
