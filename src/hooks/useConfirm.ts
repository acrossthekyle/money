'use client';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { CARD_RADIUS, NAVIGATION_RADIUS } from '@/constants';
import type { UseConfirmConfig } from '@/types';

export function useConfirm() {
  const confirm = async (config: UseConfirmConfig) => {
    return withReactContent(Swal).fire({
      allowOutsideClick: false,
      allowEscapeKey: false,
      showCancelButton: true,
      reverseButtons: true,
      topLayer: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Confirm',
      title: 'Are you absolutely sure?',
      theme: 'auto',
      customClass: {
        container: `!backdrop-blur-sm`,
        popup: `${CARD_RADIUS} !bg-(--background) !border !border-(--foreground)/12.5 text-left text-(--foreground) !w-[calc(100%-0.75rem)] !max-w-88 !grid-cols-none !pb-0 !overflow-hidden`,
        title: '!text-left !text-(--foreground) !text-base md:!text-sm !font-bold !w-full !col-start-1 !col-end-3 !p-4 !pb-0',
        htmlContainer: `!text-left !p-4 !pt-2 !text-base md:!text-sm !text-(--foreground)/90 !font-normal !col-start-1 !col-end-3 !leading-[1.6]`,
        actions: '!bg-(--foreground)/2 !border-t !border-current/12.5 !p-3 !flex !gap-2 !w-full !justify-end !mt-0 !col-start-1 !col-end-3',
        cancelButton: `!inline-flex !items-center !justify-center !py-2.5 !px-4 md:!py-1.5 md:!px-2 !uppercase !text-sm !bg-(--background) !text-(--foreground) !font-normal !border !border-current/12 !tracking-wide md:!text-tiny ${NAVIGATION_RADIUS}`,
        confirmButton: `!inline-flex !items-center !justify-center !py-2.5 !px-4 md:!py-1.5 md:!px-2 !uppercase !text-sm !bg-(--foreground) !text-(--background) !font-normal !border !border-current/62.5 !tracking-wide  md:!text-tiny ${NAVIGATION_RADIUS}`,
        input: '!flex-col !items-start !gap-4 !w-full !col-start-1 !col-end-3 !text-sm md:!text-xs !text-(--foreground) !mt-0 !mb-5 !mx-1 [&_label]:!flex [&_label]:!gap-1 [&_label]:!items-center !bg-(--background)',
        validationMessage: '!hidden',
      },
      ...config,
    });
  };

  return confirm;
};
