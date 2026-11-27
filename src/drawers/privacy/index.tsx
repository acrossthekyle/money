'use client';

import tw from '@/styles';
import Ui from '@/ui'

import { useModel } from './model';

import Policy from './policy';

export default function Drawer() {
  const {
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
      id="privacy-drawer"
      instance={instance}
      isActive={isActive}
      isBase={isBase}
      onBackdrop={onBackdrop}
      onCancel={onCancel}
    >
      <Ui.Drawer.Inner isModal>
        <Ui.Drawer.Content isActive={isActive} isDecked={isDecked} isModal>
          <Ui.Drawer.Header>
            <h2 id="drawer-header">
              Privacy Policy
            </h2>
            <p className={styles.lid}>
              Legalise for compliancy
            </p>
          </Ui.Drawer.Header>
          <Ui.Drawer.Body>
            <div className={styles.content}>
              <Policy />
            </div>
          </Ui.Drawer.Body>
          <Ui.Drawer.Footer>
            <Ui.Components.Button isGhost onClick={onClose}>
              Close
            </Ui.Components.Button>
          </Ui.Drawer.Footer>
        </Ui.Drawer.Content>
      </Ui.Drawer.Inner>
    </Ui.Drawer.Container>
  );
};

const styles = tw({
  lid: `
    text-current/62.5

    sm:text-sm
  `,
  tabs: `
    flex items-center gap-2
    mt-2
  `,
  content: `
    flex flex-col gap-4

    sm:text-sm
  `,
});
