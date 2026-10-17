'use client';

import Ui from '@/ui';

import {
  Content,
  Navigate,
  Navigation,
  Subheader,
  Title,
} from '../components';

import { useModel } from './model';

export default function Inner() {
  const {
    data,
    isActive,
    onClose,
  } = useModel();

  if (!isActive || data === undefined) {
    return null;
  }

  return (
    <>
      <Ui.Dialog.DialogHeader onClose={onClose}>
        <Ui.Dialog.DialogTitle text="No Transactions">
          <Subheader>0 items</Subheader>
        </Ui.Dialog.DialogTitle>
      </Ui.Dialog.DialogHeader>
      <Ui.Dialog.DialogContent label="no transactions details">
        <Content>
          <Title>
            There are no transactions within these dates.
          </Title>
        </Content>
        <Navigation>
          <Navigate isOutline onClick={onClose}>
            Close
          </Navigate>
        </Navigation>
      </Ui.Dialog.DialogContent>
    </>
  );
};
