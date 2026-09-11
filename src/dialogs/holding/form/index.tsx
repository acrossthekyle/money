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
      <Ui.Form.Inner>
        <Ui.Alerts.Errors items={errors} message="Form validation errors" />
        <Ui.Form.Group>
          <Ui.Form.Field>
            <Ui.Form.Label id="name">Name</Ui.Form.Label>
            <Ui.Form.Input
              id="name"
              name="name"
              type="text"
              required
              defaultValue={data?.name}
              placeholder="Max length: 48 characters"
              maxLength={48}
            />
          </Ui.Form.Field>
          <Ui.Form.Field className={styles.balance}>
            <Ui.Form.Label id="balance">Current balance or value</Ui.Form.Label>
            <Ui.Form.Currency id="balance" value={data?.balance} />
          </Ui.Form.Field>
        </Ui.Form.Group>
        <Ui.Form.Group>
          <Ui.Form.Field>
            <Ui.Form.Label id="number">
              Number (Last 4, optional)
            </Ui.Form.Label>
            <Ui.Form.Input
              id="number"
              name="number"
              type="text"
              maxLength={4}
              defaultValue={data?.number || ''}
              placeholder="1234"
            />
          </Ui.Form.Field>
          <Ui.Form.Field>
            <Ui.Form.Label id="type">Type</Ui.Form.Label>
            <Ui.Form.Select
              id="type"
              name="type"
              required
              defaultValue={data?.type}
            >
              <option value="credit_card">Credit Card</option>
              <option value="savings">Savings</option>
              <option value="checking">Checking</option>
              <option value="retirement">Retirement</option>
              <option value="property">Property</option>
            </Ui.Form.Select>
          </Ui.Form.Field>
          <Ui.Form.Field className={styles.interest}>
            <Ui.Form.Label id="interest">Interest rate (APY)</Ui.Form.Label>
            <Ui.Form.Percent id="interest" isOptional value={data?.interest} />
          </Ui.Form.Field>
        </Ui.Form.Group>
        <Ui.Form.Field>
          <Ui.Form.Label id="institution">Institution (Optional)</Ui.Form.Label>
          <Ui.Form.Input
            id="institution"
            name="institution"
            type="text"
            defaultValue={data?.institution}
            placeholder="Max length: 48 characters"
            maxLength={48}
          />
        </Ui.Form.Field>
        <Ui.Form.Input
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
        <div className={styles.ctas}>
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
  balance: `
    sm:!w-48
  `,
  interest: `
    sm:!w-34
  `,
  ctas: `
    flex gap-4
  `,
});
