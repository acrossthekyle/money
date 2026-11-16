'use client';

import Ui from '@/ui';

import { useModel } from './model';

export default function Theme() {
  const { handleOnTheme, isMounted, theme } = useModel();

  if (!isMounted) {
    return null;
  }

  return (
    <Ui.Components.Switch isActive={theme === 'light'} onChange={handleOnTheme}>
      {theme === 'light' ? 'Disable' : 'Enable'} light mode
    </Ui.Components.Switch>
  );
};
