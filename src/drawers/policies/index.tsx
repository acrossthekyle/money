'use client';

import tw from '@/styles';
import Ui from '@/ui'

import { useModel } from './model';

import Acp from './acp';
import Data from './data';
import Isp from './isp';
import Sla from './sla';

export default function Drawer() {
  const {
    handleOnView,
    instance,
    isActive,
    isBase,
    isDecked,
    onBackdrop,
    onCancel,
    onClose,
    view,
  } = useModel();

  return (
    <Ui.Drawer.Container
      id="policies-drawer"
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
              Policies
            </h2>
            <p className={styles.lid}>
              Legalise items for compliancy
            </p>
            <ul className={styles.tabs}>
              <li>
                <Ui.Components.Button
                  isGhost={view !== 'acp'}
                  isPrimary={view === 'acp'}
                  isSquared
                  onClick={() => handleOnView('acp')}
                >
                  A.C.P.
                </Ui.Components.Button>
              </li>
              <li>
                <Ui.Components.Button
                  isGhost={view !== 'sla'}
                  isPrimary={view === 'sla'}
                  isSquared
                  onClick={() => handleOnView('sla')}
                >
                  S.L.A.
                </Ui.Components.Button>
              </li>
              <li>
                <Ui.Components.Button
                  isGhost={view !== 'isp'}
                  isPrimary={view === 'isp'}
                  isSquared
                  onClick={() => handleOnView('isp')}
                >
                  I.S.P.
                </Ui.Components.Button>
              </li>
              <li>
                <Ui.Components.Button
                  isGhost={view !== 'ddr'}
                  isPrimary={view === 'ddr'}
                  isSquared
                  onClick={() => handleOnView('ddr')}
                >
                  D.D.R.
                </Ui.Components.Button>
              </li>
            </ul>
          </Ui.Drawer.Header>
          <Ui.Drawer.Body>
            <div className={styles.content}>
              {view === 'acp' && <Acp />}
              {view === 'ddr' && <Data />}
              {view === 'isp' && <Isp />}
              {view === 'sla' && <Sla />}
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
