'use client';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import tw from '@/styles';
import type { UseConfirmConfig } from '@/types';

export function useConfirm() {
  const onConfirm = async (config: UseConfirmConfig) => {
    return withReactContent(Swal).fire({
      allowOutsideClick: false,
      allowEscapeKey: false,
      showCancelButton: true,
      reverseButtons: true,
      topLayer: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Confirm & Delete',
      title: 'Are you absolutely sure?',
      theme: 'auto',
      customClass: styles,
      ...config,
    });
  };

  return {
    onConfirm,
  };
};

const styles = tw({
  container: `
    !backdrop-blur-sm
  `,
  popup: `
    !grid-cols-none
    !w-[calc(100%-0.75rem)] !max-w-96
    !pb-0
    !overflow-hidden
    !rounded-2xl
    text-left text-(--foreground)
    !bg-zinc-50
    !border !border-(--foreground)/12.5

    dark:!bg-zinc-900

    sm:!max-w-76
  `,
  title: `
    !col-start-1 !col-end-3
    !w-full
    !p-4 !pb-2
    !text-left !text-(--foreground) !text-base
    !font-bold

    sm:!text-sm
  `,
  htmlContainer: `
    !col-start-1 !col-end-3
    !p-4 !pt-2
    !text-left !text-base !text-(--foreground)/90
    !font-normal
    !leading-[1.6]

    sm:!text-sm
  `,
  actions: `
    !col-start-1 !col-end-3
    !flex !flex-col-reverse !gap-2
    !w-full
    !mt-0
    !p-4
    !bg-(--foreground)/7.5
    !border-t !border-current/12.5
    !text-base

    sm:!text-sm
  `,
  cancelButton: `
    !flex !items-center !justify-center
    !w-full
    !py-1 !px-0
    !m-0
    !text-base !text-(--foreground)
    !font-normal
    !tracking-wide
    !bg-(--background)/17.5
    !border !border-current/32.5
    !rounded-lg

    sm:!text-sm
  `,
  confirmButton: `
    !flex !items-center !justify-center
    !w-full
    !py-1 !px-0
    !m-0
    !text-base !text-(--background)
    !font-normal
    !border-0
    !tracking-wide
    !rounded-lg
    !bg-(--foreground)

    sm:!text-sm`,
  input: `
    !col-start-1 !col-end-3
    !flex-col !items-start !gap-4
    !w-full
    !mt-0 !mb-5 !mx-1
    !text-base !text-(--foreground)
    !bg-transparent

    [&_label]:!flex
    [&_label]:!items-center
    [&_label]:!gap-1
    [&_label]:!text-sm

    sm:!text-sm
  `,
  validationMessage: `
    !hidden
  `,
});
