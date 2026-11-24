'use client';

import Ui from '@/ui'

import Inner from './inner';
import { useModel } from './model';

export default function Drawer() {
  const {
    choices,
    instance,
    isActive,
    isBase,
    isDecked,
    unsynced,
  } = useModel();

  return (
    <Ui.Drawer.Container
      id="link-drawer"
      instance={instance}
      isActive={isActive}
      isBase={isBase}
    >
      <Ui.Drawer.Inner isModal>
        <Ui.Drawer.Content isActive={isActive} isDecked={isDecked} isModal>
          <Inner choices={choices} unsynced={unsynced} />
        </Ui.Drawer.Content>
      </Ui.Drawer.Inner>
    </Ui.Drawer.Container>
  );
};
