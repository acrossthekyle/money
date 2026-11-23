'use client';

import tw from '@/styles';
import Ui from '@/ui'

import { useModel } from './model';

export default function Drawer() {
  const {
    instance,
    isActive,
    isBase,
    isDecked,
    onClose,
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
          <Ui.Drawer.Header>
            <h2 className={styles.header} id="drawer-header">
              Link Balances
            </h2>
            <p className={styles.lid}>
              Select an item from the financial institution and then choose the corresponding portfolio.
            </p>
          </Ui.Drawer.Header>
          <Ui.Drawer.Body>
            ...
          </Ui.Drawer.Body>
          <Ui.Drawer.Footer>
            <Ui.Components.Button isPrimary onClick={onClose}>
              Done
            </Ui.Components.Button>
          </Ui.Drawer.Footer>
        </Ui.Drawer.Content>
      </Ui.Drawer.Inner>
    </Ui.Drawer.Container>
  );
};

const styles = tw({
  header: `
    pr-12
    truncate
  `,
  lid: `
    text-current/62.5

    sm:text-sm
  `,
  items: `
    flex flex-col gap-4
    mt-1
  `,
});
