'use client';

import Ui from '@/ui';

import Exit from './exit';
import Header from './header';
import Links from './links';
import { useModel } from './model';
import Worth from './worth';

export default function Drawer() {
  const {
    handleOnAdd,
    holdings,
    instance,
    isActive,
    onBackdrop,
    onCancel,
    onClose,
    worth,
  } = useModel();

  return (
    <Ui.Drawer.Container
      id="menu-drawer"
      instance={instance}
      isActive={isActive}
      onBackdrop={onBackdrop}
      onCancel={onCancel}
    >
      <Ui.Drawer.Inner isMenu>
        <Ui.Drawer.Content isActive={isActive} isMenu>
          <Ui.Drawer.Header onClose={onClose}>
            <Header />
          </Ui.Drawer.Header>
          <Ui.Drawer.Body>
            <Worth amount={worth} />
            <Links holdings={holdings} onClick={onClose} />
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
