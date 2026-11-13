'use client';

import {
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import type { Toast } from '@/types';

type ToastContextType = {
  onDismiss: (index: number) => void;
  onToast: (value: Toast) => void;
  toasts: Toast[];
};

export const ToastContext = createContext<ToastContextType | null>(null);

export default function ToastProvider({ children }: PropsWithChildren) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleOnDismiss = useCallback((key: number) => {
    setToasts(previous => {
      const updated = previous.filter((_, index) => index !== key);

      if (updated.length === 0 && timerRef.current) {
        clearTimeout(timerRef.current);

        timerRef.current = null;
      }

      return updated;
    });
  }, []);

  const handleOnQueue = useCallback((value: Toast) => {
    setToasts(previous => [...previous, value]);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setToasts([]);

      timerRef.current = null;
    }, 5000);
  }, []);

  return (
    <ToastContext.Provider value={{
      onDismiss: handleOnDismiss,
      onToast: handleOnQueue,
      toasts,
    }}>
      {children}
    </ToastContext.Provider>
  );
}
