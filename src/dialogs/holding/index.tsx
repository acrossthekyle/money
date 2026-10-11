'use client';

import tw from '@/styles';
import type { Holding } from '@/types';
import Ui from '@/ui';

import { useModel } from './model';

type Props = {
  holding?: Holding;
};

export default function Dialog({ holding }: Props) {
  const {
    action,
    data,
    errors,
    handleOnCancel,
    instance,
    isActive,
    isPending,
    onBackdrop,
    onCancel,
    onClose,
  } = useModel(holding);

  return (
    <Ui.Dialog.Dialog
      id="holding-dialog"
      instance={instance}
      isActive={isActive}
      onBackdrop={onBackdrop}
      onCancel={onCancel}
    >
      <Ui.Dialog.DialogInner isActive={isActive}>
        <Ui.Dialog.DialogHeader
          icon={holding ? 'edit' : 'add'}
          onClose={onClose}
        >
          Portfolio
        </Ui.Dialog.DialogHeader>
        <Ui.Alerts.Errors items={errors} message="Form validation failed" />
        <form action={action} id="holding-form">
          <Ui.Form.Inner>
            <Ui.Form.Field className={styles.name}>
              <Ui.Form.Input
                id="holding_name"
                name="name"
                type="text"
                required
                defaultValue={data?.name}
                placeholder=" "
                maxLength={48}
              />
              <Ui.Form.Label htmlFor="holding_name" isRequired>Name</Ui.Form.Label>
            </Ui.Form.Field>
            <Ui.Form.Field className={styles.balance}>
              <Ui.Form.Currency id="balance" value={data?.balance} />
              <Ui.Form.Label htmlFor="balance" isRequired>
                Equity
              </Ui.Form.Label>
            </Ui.Form.Field>
            <Ui.Form.Field className={styles.type}>
              <Ui.Form.Select
                data-empty={!data?.type}
                id="account_type"
                name="type"
                required
                defaultValue={data?.type}
              >
                <option value="">...</option>
                <option value="credit_card">Credit card</option>
                <option value="savings">Savings</option>
                <option value="checking">Checking</option>
                <option value="retirement">Retirement</option>
                <option value="property">Property</option>
              </Ui.Form.Select>
              <Ui.Form.Label htmlFor="account_type" isRequired>Type</Ui.Form.Label>
            </Ui.Form.Field>
            <Ui.Form.Field className={styles.number}>
              <Ui.Form.Input
                id="number"
                name="number"
                type="text"
                maxLength={4}
                defaultValue={data?.number || ''}
                placeholder="1234"
              />
              <Ui.Form.Label htmlFor="number">
                Account Number
              </Ui.Form.Label>
            </Ui.Form.Field>
            <Ui.Form.Field className={styles.rate}>
              <Ui.Form.Percent id="interest" value={data?.interest} />
              <Ui.Form.Label htmlFor="interest">
                Interest Rate
              </Ui.Form.Label>
            </Ui.Form.Field>
            <Ui.Form.Field className={styles.institution}>
              <Ui.Form.Input
                id="institution"
                name="institution"
                type="text"
                defaultValue={data?.institution}
                placeholder=" "
                maxLength={48}
              />
              <Ui.Form.Label htmlFor="institution">Institution</Ui.Form.Label>
            </Ui.Form.Field>
          </Ui.Form.Inner>
          <Ui.Form.Footer>
            <Ui.Form.Cancel onClick={handleOnCancel} />
            <Ui.Form.Submit disabled={isPending} isPending={isPending} />
          </Ui.Form.Footer>
        </form>
      </Ui.Dialog.DialogInner>
    </Ui.Dialog.Dialog>
  );
};

const styles = tw({
  balance: `
    !col-span-6
  `,
  type: `
    !col-span-6
  `,
  number: `
    !col-span-6
  `,
  rate: `
    !col-span-6
  `,
});
