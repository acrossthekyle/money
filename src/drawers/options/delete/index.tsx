'use client';

import type { Holding } from '@/types';
import Ui from '@/ui';

import { useModel } from './model';

type Props = {
  holding?: Holding;
};

export default function Delete({ holding }: Props) {
  const { handleOnClick } = useModel(holding);

  return (
    <Ui.Form.Delete onClick={handleOnClick}>
      Delete {holding?.type === 'property' ? 'asset' : 'account'} from portfolio
    </Ui.Form.Delete>
  );
};
