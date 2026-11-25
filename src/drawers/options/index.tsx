'use client';

import tw from '@/styles';
import Ui from '@/ui';

import Delete from './delete';
import Exit from './exit';
import { useModel } from './model';
import Pin from './pin';
import Theme from './theme';

type Props = {
  isDemo: boolean;
};

export default function Drawer({ isDemo }: Props) {
  const {
    handleOnBrowse,
    handleOnPolicies,
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
      id="options-drawer"
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
            </ul>
          </Ui.Drawer.Body>
          <Ui.Drawer.Footer>
            <Ui.Components.Button isPrimary isSquared onClick={handleOnBrowse}>
              View Accounts/Assets
            </Ui.Components.Button>
            <Exit />
            <Delete holding={holding} />
            {!isDemo && (
              <button
                className={styles.policies}
                onClick={handleOnPolicies}
                type="button"
              >
                View Policies
              </button>
            )}
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
  policies: `
    flex justify-center
    text-sm text-current/62.5
  `,
});
