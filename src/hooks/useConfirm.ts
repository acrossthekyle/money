'use client';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

type Config = {
  target: string;
  text: string;
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
        popup: "!rounded-md bg-(--background) border-(--foreground)/22.5 text-left text-(--foreground) w-full !max-w-sm !grid-cols-none !pb-0 !overflow-hidden",
        title: "!text-left !text-(--foreground) !text-sm !font-bold !w-full !col-start-1 !col-end-3 !p-4 !pb-0",
        htmlContainer: `!text-left !p-4 !pt-2 !text-sm !text-current/90 !font-normal !col-start-1 !col-end-3 !leading-[1.6]`,
        actions: "!bg-(--foreground)/2.5 !border-t !border-current/12.5 !p-3 !flex !gap-2 !w-full !justify-end !mt-0 !col-start-1 !col-end-3",
        confirmButton: "inline-flex !rounded-full !bg-(--foreground) !text-(--background) !px-3 !py-1 !text-xs !transition-all !duration-300 hover:!bg-(--foreground)/92.5",
        cancelButton: "inline-flex !rounded-full !bg-(--foreground)/7.5 !border !border-current/22.5 !text-(--foreground) !px-3 !py-1 !text-xs !transition-all !duration-300 hover:!border-current/62.5",
      },
      ...config,
    });
  };

  return confirm;
};
