'use client';

import { Check, Trash } from 'lucide-react';

import tw from '@/styles';
import type { Holding } from '@/types';
import Ui from '@/ui';

import { useModel } from './model';

type Props = {
  holding?: Holding;
};

export default function Form({ holding }: Props) {
  const {
    action,
    canDelete,
    data,
    errors,
    handleOnDelete,
    isPending,
    willDelete,
  } = useModel(holding);

  return (
    <Ui.Form.Container action={action} id="holding-form">
      <Ui.Alerts.Errors items={errors} message="Form validation failed" />
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
            Number
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
            <option value="credit_card">Credit card</option>
            <option value="savings">Savings</option>
            <option value="checking">Checking</option>
            <option value="retirement">Retirement</option>
            <option value="property">Property</option>
          </Ui.Form.Select>
          <Ui.Form.Label htmlFor="account_type" isRequired>Type</Ui.Form.Label>
        </Ui.Form.Field>
        <Ui.Form.Field className={styles.rate}>
          <Ui.Form.Percent id="interest" value={data?.interest} />
          <Ui.Form.Label htmlFor="interest">Rate</Ui.Form.Label>
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
        <input
          name="purge"
          type="text"
          value={willDelete ? 'true' : 'false'}
          readOnly
          className="hidden"
        />
      </Ui.Form.Inner>
      <Ui.Form.Footer>
        {canDelete ? (
          <Ui.Components.Action
            disabled={isPending}
            onClick={handleOnDelete}
          >
            <Ui.Components.Icon>
              <Trash className={styles.icon} />
            </Ui.Components.Icon>
            <Ui.Components.Text right>
              Delete
            </Ui.Components.Text>
          </Ui.Components.Action>
        ) : <span />}
        <div className={styles.actions}>
          <Ui.Components.Action href="/" mode="secondary">
            <Ui.Components.Text left right>
              Cancel
            </Ui.Components.Text>
          </Ui.Components.Action>
          <Ui.Components.Action disabled={isPending} type="submit">
            <Ui.Components.Icon>
              <Check className={styles.icon} />
            </Ui.Components.Icon>
            <Ui.Components.Text right>
              {isPending ? 'Processing...' : (!holding ? 'Create' : 'Update')}
            </Ui.Components.Text>
          </Ui.Components.Action>
        </div>
      </Ui.Form.Footer>
    </Ui.Form.Container>
  );
};

const styles = tw({
  name: `
    col-span-12
  `,
  balance: `
    col-span-12

    sm:col-span-7
  `,
  number: `
    col-span-12

    sm:col-span-5
  `,
  type: `
    col-span-12

    sm:col-span-8
  `,
  rate: `
    col-span-12

    sm:col-span-4
  `,
  institution: `
    col-span-12
  `,
  actions: `
    flex gap-4
  `,
  icon: `
    w-3 h-3
    stroke-2
  `,
});
