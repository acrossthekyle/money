'use client';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

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
        popup: `!rounded-2xl !bg-zinc-50 dark:!bg-zinc-950 !border !border-(--foreground)/12.5 text-left text-(--foreground) !w-[calc(100%-0.75rem)] !max-w-76 !grid-cols-none !pb-0 !overflow-hidden`,
        title: '!text-left !text-(--foreground) !text-sm !font-bold !w-full !col-start-1 !col-end-3 !p-4 !pb-2',
        htmlContainer: `!text-left !p-4 !pt-2 !text-sm !text-(--foreground)/90 !font-normal !col-start-1 !col-end-3 !leading-[1.6]`,
        actions: '!bg-(--foreground)/7.5 !border-t !border-current/12.5 !p-3 !flex !gap-2 !w-full !justify-end !mt-0 !col-start-1 !col-end-3 !text-sm',
        cancelButton: `!inline-flex !items-center !justify-center !py-1 !px-4 !text-sm !bg-(--background)/17.5 !text-(--foreground) !font-normal !border !border-current/32.5 !tracking-wide !rounded-full`,
        confirmButton: `!inline-flex !items-center !justify-center !py-1 !px-4 !text-sm !bg-(--foreground) !text-(--background) !font-normal !border-0 !tracking-wide !rounded-full`,
        input: '!flex-col !items-start !gap-4 !w-full !col-start-1 !col-end-3 !text-sm !text-(--foreground) !mt-0 !mb-5 !mx-1 [&_label]:!flex [&_label]:!gap-1 [&_label]:!items-center [&_label]:!text-sm !bg-transparent',
        validationMessage: '!hidden',
      },
      ...config,
    });
  };

  return confirm;
};
