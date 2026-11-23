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
  data: unknown;
  isOpen: boolean;
  onBackdrop: (event: MouseEvent<HTMLDialogElement>) => void;
  onCancel: (event: KeyboardEvent<HTMLDialogElement>) => void;
  onClose: () => void;
  onDrawer: (name: string, data?: unknown) => void;
  onRegister: (name: string, node: HTMLDialogElement | null) => void;
  onReset: () => void;
  stack: string[];
};

export const DrawerContext = createContext<DrawerContextType | null>(null);

export default function DrawerProvider({ children }: PropsWithChildren) {
  const [data, setData] = useState<unknown>();
  const [openDrawers, setOpenDrawers] = useState<string[]>([]);
  const [stack, setStack] = useState<string[]>([]);

  const refs = useRef<Record<string, HTMLDialogElement | null>>({});

  const isOpen = openDrawers.length > 0;
  const topDrawer = stack[stack.length - 1];

  const handleOnClose = useCallback(() => {
    if (stack.length === 0) {
      return;
    }

    const closingName = stack[stack.length - 1];
    const closingNode = refs.current[closingName];

    setStack(previous => previous.slice(0, -1));

    if (!closingNode) {
      setOpenDrawers(previous => previous.filter((item) => item !== closingName));

      return;
    }

    const handleTransitionEnd = (event: TransitionEvent) => {
      if (event.target !== closingNode && !closingNode.contains(event.target as Node)) {
        return;
      }

      closingNode.close();

      setOpenDrawers(previous => previous.filter((item) => item !== closingName));
      setData(undefined);

      closingNode.removeEventListener('transitionend', handleTransitionEnd);
    };

    closingNode.addEventListener('transitionend', handleTransitionEnd);
  }, [stack]);

  const handleOnEscape = useCallback((event: WindowEventMap['keyup']) => {
    if (!topDrawer) {
      return;
    }

    if (topDrawer === 'link' || topDrawer === 'sync') {
      return;
    }

    if (event.key === 'Escape') {
      event.preventDefault();

      handleOnClose();
    }
  }, [topDrawer, handleOnClose]);

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

  const handleOnOpen = useCallback(<T = unknown>(name: string, data?: T) => {
    const activeNode = refs.current[name];

    if (!activeNode) {
      return;
    }

    if (stack.includes(name)) {
      return;
    }

    if (!activeNode.open) {
      activeNode.showModal();
    }

    setOpenDrawers(previous => [...previous, name]);
    setData(data ?? undefined);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setStack(previous => [...previous, name]);
      });
    });
  }, [stack]);

  const handleOnCancel = useCallback((event: React.SyntheticEvent<HTMLDialogElement>) => {
    event.preventDefault();

    handleOnClose();
  }, [handleOnClose]);

  const handleOnBackdrop = useCallback((event: MouseEvent<HTMLDialogElement>) => {
    const activeNode = topDrawer ? refs.current[topDrawer] : null;

    if (event.target === activeNode) {
      handleOnClose();
    }
  }, [topDrawer, handleOnClose]);

  const handleOnReset = useCallback(() => {
    Object.values(refs.current).forEach((node) => {
      if (node?.open) {
        node.close();
      }
    });

    setStack([]);
    setOpenDrawers([]);
  }, []);

  return (
    <DrawerContext.Provider
      value={{
        data,
        isOpen,
        onBackdrop: handleOnBackdrop,
        onCancel: handleOnCancel,
        onClose: handleOnClose,
        onDrawer: handleOnOpen,
        onRegister: handleOnRegister,
        onReset: handleOnReset,
        stack,
      }}
    >
      {children}
    </DrawerContext.Provider>
  );
}
