'use client';

import { createContext, useState } from 'react';

type LoadingContextType = {
  isLoading: boolean;
  onLoaded: () => void;
  onLoading: () => void;
};

export const LoadingContext = createContext<LoadingContextType | null>(null);

export default function LoadingProvider({ children }: React.PropsWithChildren) {
  const [isLoading, setIsLoading] = useState(false);

  const handleOnLoading = () => {
    setIsLoading(true);
  };

  const handleOnLoaded = () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 250);
  };

  return (
    <LoadingContext.Provider value={{
      isLoading,
      onLoaded: handleOnLoaded,
      onLoading: handleOnLoading,
    }}>
      {children}
    </LoadingContext.Provider>
  );
};
