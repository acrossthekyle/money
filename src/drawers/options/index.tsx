'use client';

import tw from '@/styles';
import Ui from '@/ui';

import Delete from './delete';
import Exit from './exit';
import { useModel } from './model';
import Pin from './pin';
import Theme from './theme';

export default function Drawer() {
  const {
    handleOnBrowse,
    holding,
    instance,
    isActive,
    isBase,
    isDecked,
    onBackdrop,
    onCancel,
  } = useModel();

  return (
    <Ui.Drawer.Container
      id="card-drawer"
      instance={instance}
      isActive={isActive}
      isBase={isBase}
      onBackdrop={onBackdrop}
      onCancel={onCancel}
    >
      <Ui.Drawer.Inner isCard>
        <Ui.Drawer.Content isActive={isActive} isCard isDecked={isDecked}>
          <Ui.Drawer.Body>
            <ul className={styles.list}>
              <li>
                <Theme />
              </li>
              <li>
                <Pin holding={holding} />
              </li>
              <li>
                <Delete holding={holding} />
              </li>
            </ul>
          </Ui.Drawer.Body>
          <Ui.Drawer.Footer>
            <Ui.Components.Button isPrimary isSquared onClick={handleOnBrowse}>
              View Accounts/Assets
            </Ui.Components.Button>
            <Exit />
          </Ui.Drawer.Footer>
        </Ui.Drawer.Content>
      </Ui.Drawer.Inner>
    </Ui.Drawer.Container>
  );
};

const styles = tw({
  list: `
    flex flex-col gap-4
  `,
});
