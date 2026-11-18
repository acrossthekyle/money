'use client';

import Ui from '@/ui'

import Heading from './heading';
import { useModel } from './model';
import Transactions from './transactions';

export default function Drawer() {
  const {
    day,
    handleOnAdd,
    handleOnEdit,
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
      id="transactions-drawer"
      instance={instance}
      isActive={isActive}
      isBase={isBase}
      onBackdrop={onBackdrop}
      onCancel={onCancel}
    >
      <Ui.Drawer.Inner isModal>
        <Ui.Drawer.Content isActive={isActive} isDecked={isDecked} isModal>
          <Ui.Drawer.Header>
            {day !== undefined && (
              <Heading day={day} />
            )}
          </Ui.Drawer.Header>
          <Ui.Drawer.Body>
            {day !== undefined && (
              <Transactions
                day={day}
                onEdit={handleOnEdit}
              />
            )}
          </Ui.Drawer.Body>
          <Ui.Drawer.Footer>
            <Ui.Components.Button isPrimary onClick={handleOnAdd}>
              Add Transaction
            </Ui.Components.Button>
            <Ui.Components.Button isGhost onClick={onClose}>
              Close
            </Ui.Components.Button>
          </Ui.Drawer.Footer>
        </Ui.Drawer.Content>
      </Ui.Drawer.Inner>
    </Ui.Drawer.Container>
  );
};
