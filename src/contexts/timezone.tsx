'use client';

import { createContext, useState } from 'react';

type TimezoneContextType = {
  zone: string;
};

type Props = {
  zone: string;
};

export const TimezoneContext = createContext<TimezoneContextType | null>(null);

export default function TimezoneProvider({
  children,
  zone,
}: React.PropsWithChildren<Props>) {
  const [timezone] = useState(zone);

  return (
    <TimezoneContext.Provider value={{
      zone: timezone,
    }}>
      {children}
    </TimezoneContext.Provider>
  );
};
