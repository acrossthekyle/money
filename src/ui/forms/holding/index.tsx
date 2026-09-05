'use client';

import { useActionState, useEffect, useState } from 'react';
import CurrencyInput from 'react-currency-input-field';

import { put } from '@/actions/holdings/put';
import tw from '@/styles';
import type { FormStateError, Holding, HoldingFormState } from '@/types';

import { Button, Field, Footer, Group, Input, Label, Select } from '../components';

type Props = {
  holding?: Holding;
  onDone: () => void;
};

export default function Form({
  holding,
  children,
  onDone,
}: React.PropsWithChildren<Props>) {
  const putable = put.bind(null, holding || null);

  const [state, action, isPending] = useActionState(putable, {
    data: holding,
    hasFailed: false,
    isSuccessful: false,
    message: '',
  } as HoldingFormState);

  const data = state?.data ?? holding;

  const [isPurge, setIsPurge] = useState(false);
  const [errors, setErrors] = useState<FormStateError[]>([]);

  useEffect(() => {
    if (state?.isSuccessful) {
      onDone();
    }
  }, [state?.isSuccessful, onDone]);

  useEffect(() => {
    if (state?.hasFailed && state?.errors) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setErrors(state?.errors || []);
    }
  }, [state?.hasFailed, state?.errors]);

  const handlePurge = async () => {
    setIsPurge(true);

    if (confirm('Are you sure you want to delete this holding and its budgets? This action cannot be undone.')) {
      const form = document.getElementById('holding-form');

      if (form instanceof HTMLFormElement) {
        form.requestSubmit();
      }
    } else {
      setIsPurge(false);
    }
  };

  return (
    <form
      action={action}
      className={styles.container}
      id="holding-form"
    >
      <div className={styles.inner}>
        {errors.length > 0 && (
          <div aria-live="polite" className="rounded-md border border-red-400 bg-red-500 text-xs font-medium p-2.5">
            <p className="font-black uppercase mb-2">{state?.message}:</p>
            <ul>
              {errors.map((error) => (
                <li key={error.field}>
                  • <span className="capitalize font-bold">{error.field}:</span> {error.error}
                </li>
              ))}
            </ul>
          </div>
        )}

        <Group>
          <Field>
            <Label id="name">Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              required
              defaultValue={data?.name}
              placeholder="Max length: 48 characters"
              maxLength={48}
            />
          </Field>
          <Field className="!w-48">
            <Label id="balance">Current balance or value</Label>
            <CurrencyInput
              className="border border-current/20.5 rounded-md p-2 pl-3 text-sm"
              id="balance"
              name="balance"
              required
              placeholder="0.00"
              defaultValue={data?.balance}
              decimalsLimit={2}
              decimalScale={2}
              prefix="$"
            />
          </Field>
        </Group>
        <Group>
          <Field>
            <Label id="number">Last 4 Account Numbers (Optional)</Label>
            <Input
              id="number"
              name="number"
              type="text"
              defaultValue={data?.number || ''}
              placeholder="1234"
            />
          </Field>
          <Field>
            <Label id="type">Type</Label>
            <Select
              id="type"
              name="type"
              required
              defaultValue={data?.type}
            >
              <option value="credit_card">Credit Card</option>
              <option value="savings">Savings Account</option>
              <option value="checking">Checking Account</option>
              <option value="retirement">Retirement Account</option>
              <option value="taxable">Taxable Account</option>
              <option value="health">Health Account</option>
              <option value="property">Property</option>
              <option value="other">Other</option>
            </Select>
          </Field>
        </Group>
        <Field>
          <Label id="institution">Institution (Optional)</Label>
          <Input
            id="institution"
            name="institution"
            type="text"
            defaultValue={data?.institution}
            placeholder="Max length: 48 characters"
            maxLength={48}
          />
        </Field>
        <Input
          name="purge"
          type="text"
          value={isPurge ? 'true' : 'false'}
          readOnly
          className="hidden"
        />
      </div>
      <Footer>
        {holding !== undefined ? (
          <Button disabled={isPending} isDestructive onClick={handlePurge} type="button">
            Delete
          </Button>
        ) : <span />}
        <div className="flex gap-4">
          {children}
          <Button disabled={isPending} id="submit" type="submit">
            Submit
          </Button>
        </div>
      </Footer>
    </form>
  );
};

const styles = tw({
  container: `
    w-full
  `,
  inner: `
    flex flex-col gap-4
    px-4 py-2
  `,
});
