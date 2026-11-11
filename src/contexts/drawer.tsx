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

type DrawerContextType = {
  drawer: string;
  isOpen: boolean;
  onBackdrop: (event: MouseEvent<HTMLDialogElement>) => void;
  onCancel: (event: KeyboardEvent<HTMLDialogElement>) => void;
  onClose: () => void;
  onDrawer: (name: string) => void;
  onRegister: (name: string, node: HTMLDialogElement | null) => void;
};

export const DrawerContext = createContext<DrawerContextType | null>(null);

export default function DrawerProvider({ children }: PropsWithChildren) {
  const [drawer, setDrawer] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const refs = useRef<Record<string, HTMLDialogElement | null>>({});

  const handleOnClose = useCallback(() => {
    const activeNode = refs.current[drawer];

    setIsOpen(false);
    setDrawer('');

    if (!activeNode) {
      return;
    }

    const handleTransitionEnd = () => {
      activeNode.close();
    };

    activeNode.addEventListener('transitionend', handleTransitionEnd, {
      once: true,
    });
  }, [drawer]);

  const handleOnEscape = useCallback((event: WindowEventMap['keyup']) => {
    const activeNode = refs.current[drawer];

    if (!activeNode) {
      return;
    }

    if (event.key === 'Escape') {
      event.preventDefault();

      handleOnClose();
    }
  }, [drawer, handleOnClose]);

  useLayoutEffect(() => {
    if (isOpen) {
      window.addEventListener('keyup', handleOnEscape);

      return () => {
        window.removeEventListener('keyup', handleOnEscape);
      };
    }
  }, [handleOnEscape, isOpen]);

  const handleOnRegister = useCallback((name: string, node: HTMLDialogElement | null) => {
    refs.current[name] = node;
  }, []);

  const handleOnOpen = useCallback((name: string) => {
    const activeNode = refs.current[name];

    if (!activeNode) {
      return;
    }

    activeNode.showModal();

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsOpen(true);
        setDrawer(name);
      });
    });
  }, []);

  const handleOnCancel = useCallback((event: React.SyntheticEvent<HTMLDialogElement>) => {
    event.preventDefault();

    handleOnClose();
  }, [handleOnClose]);

  const handleOnBackdrop = useCallback((event: MouseEvent<HTMLDialogElement>) => {
    const activeNode = refs.current[drawer];

    if (event.target === activeNode) {
      handleOnClose();
    }
  }, [drawer, handleOnClose]);

  return (
    <DrawerContext.Provider value={{
      drawer,
      isOpen,
      onBackdrop: handleOnBackdrop,
      onCancel: handleOnCancel,
      onClose: handleOnClose,
      onDrawer: handleOnOpen,
      onRegister: handleOnRegister,
    }}>
      {children}
    </DrawerContext.Provider>
  );
}
