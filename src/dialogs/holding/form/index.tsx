'use client';

import tw from '@/styles';
import type { Holding } from '@/types';
import Ui from '@/ui';

import { useModel } from './model';

type Props = {
  holding?: Holding;
  onClose: () => void;
  onDone: () => void;
};

export default function Form({
  holding,
  onClose,
  onDone,
}: Props) {
  const {
    action,
    canDelete,
    data,
    errors,
    handleOnDelete,
    isPending,
    willDelete,
  } = useModel(onDone, holding);

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
            placeholder=""
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
            placeholder=""
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
          <Ui.Form.Button
            disabled={isPending}
            isDestructive
            onClick={handleOnDelete}
            type="button"
          >
            Delete
          </Ui.Form.Button>
        ) : <span />}
        <div className={styles.actions}>
          <Ui.Form.Button onClick={onClose}>
            Cancel
          </Ui.Form.Button>
          <Ui.Form.Button disabled={isPending} id="submit" type="submit">
            {holding ? 'Update' : 'Create'}
          </Ui.Form.Button>
        </div>
      </Ui.Form.Footer>
    </Ui.Form.Container>
  );
};

const styles = tw({
  name: `
    col-span-24

    xs:col-span-15
    sm:col-span-16
  `,
  balance: `
    col-span-14
    mr-2

    xs:mr-0
    xs:col-span-9
    sm:col-span-8
  `,
  number: `
    col-span-10
    ml-2

    xs:col-span-7
    xs:ml-0
  `,
  type: `
    col-span-24

    xs:col-span-10
  `,
  rate: `
    col-span-9
    mr-2

    xs:mr-0
    xs:col-span-7
  `,
  institution: `
    col-span-15
    ml-2

    xs:ml-0
    xs:col-span-24
  `,
  actions: `
    flex gap-4
  `,
});
