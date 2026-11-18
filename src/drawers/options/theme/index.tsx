'use client';

import Ui from '@/ui';

import { useModel } from './model';

export default function Theme() {
  const { handleOnTheme, isMounted, theme } = useModel();

  if (!isMounted) {
    return null;
  }

  return (
    <Ui.Components.Switch isActive={theme === 'dark'} onChange={handleOnTheme}>
      Enable dark mode
    </Ui.Components.Switch>
  );
};
