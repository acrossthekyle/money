'use client';

import {
  PropsWithChildren,
  RefObject,
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

type MenuContextType = {
  instance: RefObject<HTMLDivElement | null>;
  isActive: boolean;
  onToggle: () => void;
};

export const MenuContext = createContext<MenuContextType | null>(null);

export default function MenuProvider({ children }: PropsWithChildren) {
  const [isActive, setIsActive] = useState(false);

  const instance = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isActive) {
      return;
    }

    const handleWatcher = (event: MouseEvent) => {
      if (instance.current && !instance.current.contains(event.target as Node)) {
        setIsActive(false);
      }
    };

    document.addEventListener('mousedown', handleWatcher);

    return () => {
      document.removeEventListener('mousedown', handleWatcher);
    };
  }, [isActive]);

  const handleOnToggle = useCallback(() => {
    setIsActive(previous => !previous);
  }, []);

  return (
    <MenuContext.Provider value={{
      instance,
      isActive,
      onToggle: handleOnToggle,
    }}>
      {children}
    </MenuContext.Provider>
  );
}
