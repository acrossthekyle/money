'use client';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

type Config = {
  cancelButtonText?: string;
  confirmButtonText?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  input?: any;
  inputOptions?: object;
  inputValidator?: (value: string) => string;
  title?: string;
  target: string;
  text?: string;
};

export function useConfirm() {
  const confirm = async (config: Config) => {
    return withReactContent(Swal).fire({
      allowOutsideClick: false,
      allowEscapeKey: false,
      showCancelButton: true,
      reverseButtons: true,
      topLayer: true,
      confirmButtonText: 'Continue',
      title: 'Are you absolutely sure?',
      theme: 'auto',
      customClass: {
        container: `!backdrop-blur-sm`,
        popup: '!rounded-md !bg-(--background) !border !border-(--foreground)/12.5 text-left text-(--foreground) !w-[calc(100%-0.75rem)] !max-w-md !grid-cols-none !pb-0 !overflow-hidden',
        title: '!text-left !text-(--foreground) !text-sm !font-bold !w-full !col-start-1 !col-end-3 !p-4 !pb-0',
        htmlContainer: `!text-left !p-4 !pt-2 !text-sm !text-(--foreground)/90 !font-normal !col-start-1 !col-end-3 !leading-[1.6]`,
        actions: '!bg-(--foreground)/7.5 !border-t !border-current/12.5 !p-3 !flex !gap-2 !w-full !justify-end !mt-0 !col-start-1 !col-end-3',
        cancelButton: 'inline-flex !rounded-full !bg-(--background) !border !border-current/22.5 !text-(--foreground) !px-3 !py-1 !text-tiny !font-sans !uppercase !transition-all !duration-300 hover:!border-current/62.5',
        confirmButton: 'inline-flex !rounded-full !border !border-current/22.5 !bg-(--foreground) !text-(--background) !px-3 !py-1 !text-tiny !font-sans !uppercase !transition-all !duration-300 hover:!bg-(--foreground)/75',
        input: '!flex-col !items-start !gap-4 !text-xs !mt-0 !mb-5 !mx-1 [&_label]:!flex [&_label]:!gap-1 [&_label]:!items-center !bg-(--background)',
        validationMessage: '!hidden',
      },
      ...config,
    });
  };

  return confirm;
};
