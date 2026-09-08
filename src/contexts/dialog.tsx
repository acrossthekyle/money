'use client';

import {
  KeyboardEvent,
  MouseEvent,
  PropsWithChildren,
  createContext,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

type DialogContextType = {
  dialog: string;
  isOpen: boolean;
  onBackdrop: (event: MouseEvent<HTMLDialogElement>) => void;
  onCancel: (event: KeyboardEvent<HTMLDialogElement>) => void;
  onClose: () => void;
  onDialog: (name: string) => void;
  onRegister: (name: string, node: HTMLDialogElement | null) => void;
};

export const DialogContext = createContext<DialogContextType | null>(null);

export default function DialogProvider({ children }: PropsWithChildren) {
  const [dialog, setDialog] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const dialogRefs = useRef<Record<string, HTMLDialogElement | null>>({});

  const updateBackdropHeight = useCallback((forcedName?: string) => {
    const activeNode = dialogRefs.current[forcedName || dialog];

    if (activeNode) {
      const height = document.documentElement.scrollHeight;

      activeNode.style.setProperty('--dialog-backdrop-height', `${height}px`);
    }
  }, [dialog]);

  const handleOnWindowResize = useCallback(() => {
    updateBackdropHeight();
  }, [updateBackdropHeight]);

  const handleOnClose = useCallback(() => {
    const activeNode = dialogRefs.current[dialog];

    setIsOpen(false);
    setDialog('');

    if (!activeNode) {
      return;
    }

    const handleTransitionEnd = () => {
      activeNode.close();
    };

    activeNode.addEventListener('transitionend', handleTransitionEnd, { once: true });
  }, [dialog]);

  const handleOnEscape = useCallback((event: WindowEventMap['keyup']) => {
    const activeNode = dialogRefs.current[dialog];

    if (!activeNode) {
      return;
    }

    if (event.key === 'Escape') {
      event.preventDefault();

      handleOnClose();
    }
  }, [dialog, handleOnClose]);

  useLayoutEffect(() => {
    if (isOpen) {
      updateBackdropHeight();

      window.addEventListener('resize', handleOnWindowResize);
      window.addEventListener('keyup', handleOnEscape);

      return () => {
        window.removeEventListener('resize', handleOnWindowResize);
        window.removeEventListener('keyup', handleOnEscape);
      };
    }
  }, [handleOnEscape, handleOnWindowResize, isOpen, updateBackdropHeight]);

  const handleOnRegister = useCallback((name: string, node: HTMLDialogElement | null) => {
    dialogRefs.current[name] = node;
  }, []);

  const handleOnOpen = useCallback((name: string) => {
    const activeNode = dialogRefs.current[name];

    if (!activeNode) {
      return;
    }

    activeNode.style.setProperty('--dialog-top-position', `${window.scrollY}px`);

    activeNode.showModal();

    updateBackdropHeight(name);

    requestAnimationFrame(() => {
      setIsOpen(true);
      setDialog(name);

      setTimeout(() => {
        const firstButton = activeNode.querySelector('button');

        if (firstButton) {
          firstButton.focus();
        }
      }, 50);
    });
  }, [updateBackdropHeight]);

  const handleOnCancel = useCallback((event: React.SyntheticEvent<HTMLDialogElement>) => {
    event.preventDefault();

    handleOnClose();
  }, [handleOnClose]);

  const handleOnBackdrop = useCallback((event: MouseEvent<HTMLDialogElement>) => {
    const activeNode = dialogRefs.current[dialog];

    if (event.target === activeNode) {
      handleOnClose();
    }
  }, [dialog, handleOnClose]);

  return (
    <DialogContext.Provider value={{
      dialog,
      isOpen,
      onBackdrop: handleOnBackdrop,
      onCancel: handleOnCancel,
      onClose: handleOnClose,
      onDialog: handleOnOpen,
      onRegister: handleOnRegister,
    }}>
      {children}
    </DialogContext.Provider>
  );
}
