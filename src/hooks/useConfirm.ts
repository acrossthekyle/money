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
        popup: `!rounded-4xl !bg-(--background) !border !border-(--foreground)/12.5 text-left text-(--foreground) !w-[calc(100%-0.75rem)] !max-w-88 !grid-cols-none !p-4 !overflow-hidden`,
        title: '!text-left !text-(--foreground) !text-xl !font-bold !w-full !col-start-1 !col-end-3 !pb-6',
        htmlContainer: `!text-left !p-4 !pt-2 !text-base !text-(--foreground)/90 !font-normal !col-start-1 !col-end-3 `,
        actions: '!flex !justify-between !gap-2 !w-full !mt-0 !p-4 !col-start-1 !col-end-3',
        cancelButton: `!inline-flex !w-fit !items-center !justify-center !py-2 !px-4 !uppercase !text-sm !bg-transparent !text-(--foreground) !font-semibold !border !rounded-full !opacity-50`,
        confirmButton: `!inline-flex !w-fit !items-center !justify-center !py-2 !px-4 !uppercase !text-sm !bg-transparent !text-(--foreground) !font-semibold !border !rounded-full`,
        input: '!flex-col !items-start !gap-4 !w-full !col-start-1 !col-end-3 !text-sm md:!text-xs !text-(--foreground) !mt-0 !mb-5 !mx-1 [&_label]:!flex [&_label]:!gap-1 [&_label]:!items-center !bg-(--background)',
        validationMessage: '!hidden',
      },
      ...config,
    });
  };

  return confirm;
};
