'use client';

import type { Holding } from '@/types';
import Ui from '@/ui';

import { useModel } from './model';

type Props = {
  holding?: Holding;
};

export default function Pin({ holding }: Props) {
  const { handleOnChange, isActive } = useModel(holding);

  return (
    <Ui.Components.Switch isActive={isActive} onChange={handleOnChange}>
      Set as default {holding?.type === 'property' ? 'asset' : 'account'}
    </Ui.Components.Switch>
  );
};
