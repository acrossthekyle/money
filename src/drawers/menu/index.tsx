'use client';

import Ui from '@/ui';

import Exit from './exit';
import Links from './links';
import { useModel } from './model';

export default function Drawer() {
  const {
    active,
    handleOnAdd,
    holdings,
    instance,
    isActive,
    isBase,
    isDecked,
    onBackdrop,
    onCancel,
    onClose,
  } = useModel();

  return (
    <Ui.Drawer.Container
      id="menu-drawer"
      instance={instance}
      isActive={isActive}
      isBase={isBase}
      onBackdrop={onBackdrop}
      onCancel={onCancel}
    >
      <Ui.Drawer.Inner isMenu>
        <Ui.Drawer.Content isActive={isActive} isDecked={isDecked} isMenu>
          <Ui.Drawer.Body>
            <Links active={active} holdings={holdings} onClick={onClose} />
          </Ui.Drawer.Body>
          <Ui.Drawer.Footer>
            <Ui.Components.Button isPrimary onClick={handleOnAdd}>
              Add to Portfolio
            </Ui.Components.Button>
            <Exit />
          </Ui.Drawer.Footer>
        </Ui.Drawer.Content>
      </Ui.Drawer.Inner>
    </Ui.Drawer.Container>
  );
};
