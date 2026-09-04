'use client';

import { format, parseISO } from 'date-fns';
import { ChangeEvent, useActionState, useEffect, useState } from 'react';
import CurrencyInput from 'react-currency-input-field';

import { put } from '@/actions/budgets/put';
import { ACCOUNTS, ASSETS, DATE_FORMAT } from '@/constants';
import tw from '@/styles';
import type { Budget, BudgetFormState, Holding } from '@/types';

import { Button, Field, Footer, Group, Input, Label, Prefix, Select } from '../components';

type Props = {
  budget?: Budget;
  date: string;
  holdings: Holding[];
  parent: string;
  onDone: () => void;
};

export default function Form({
  budget,
  children,
  date,
  holdings,
  parent,
  onDone,
}: React.PropsWithChildren<Props>) {
  const putable = put.bind(null, budget || null);

  const [state, action, isPending] = useActionState(putable, {
    data: budget,
    hasFailed: false,
    isSuccessful: false,
    message: '',
  } as BudgetFormState);

  const data = state?.data || budget;
  const selectedParent = parent || data?.parent;

  const [selectedType, setSelectedType] = useState('debit');
  const [isErase, setIsErase] = useState(false);
  const [isPurge, setIsPurge] = useState(false);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (budget) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedType(budget.type);
    }
  }, [budget]);

  useEffect(() => {
    if (state?.isSuccessful) {
      onDone({
        message: state?.message,
      });
    }
  }, [state?.isSuccessful]);

  useEffect(() => {
    if (state?.hasFailed && state?.errors) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setErrors(state?.errors || []);
    }
  }, [state?.hasFailed, state?.errors]);

  const handleErase = async () => {
    await setIsErase(true);

    if (confirm(`Are you sure you want to delete this budget on ${date}? This action cannot be undone.`)) {
      const form = document.getElementById('budget-form');

      if (form) {
        await form.requestSubmit();
      }
    } else {
      setIsErase(false);
    }
  };

  const handlePurge = async () => {
    await setIsPurge(true);

    if (confirm('Are you sure you want to delete the entire budget? This action cannot be undone.')) {
      const form = document.getElementById('budget-form');

      if (form) {
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
      id="budget-form"
      key={data?.id || date}
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

        <Input
          name="parent"
          type="text"
          value={parent}
          readOnly
          className="hidden"
        />
        <Input
          name="date"
          type="text"
          value={date}
          readOnly
          className="hidden"
        />
        <Group>
          <Field>
            <Label id="name">Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              required
              defaultValue={data?.name}
              placeholder="Max length: 36 characters"
              maxLength={36}
            />
          </Field>
          <Field className="!w-26">
            <Label id="amount">Amount</Label>
            <CurrencyInput
              className="border border-current/20.5 rounded-md p-2 pl-3 text-sm"
              id="amount"
              name="amount"
              required
              placeholder="0.00"
              defaultValue={data?.amount}
              decimalsLimit={2}
              decimalScale={2}
              prefix="$"
            />
          </Field>
          <Field className="!w-62">
            <Label id="category">Category</Label>
            <Select
              id="category"
              name="category"
              required
              defaultValue={data?.category}
            >
              <option value="subscription">Subscription</option>
              <option value="food">Food</option>
              <option value="income">Income</option>
              <option value="transfer">Transfer</option>
              <option value="utility">Utility</option>
              <option value="health">Health</option>
              <option value="insurance">Insurance</option>
              <option value="taxes">Taxes</option>
              <option value="payment">Payment</option>
            </Select>
          </Field>
        </Group>
        <Group>
          <Field className="!w-44">
            <Label id="type">Type</Label>
            <Group>
              <Field isStacked={false}>
                <Input
                  id="debit"
                  name="type"
                  type="radio"
                  required
                  value="debit"
                  defaultChecked={data !== undefined ? data.type === 'debit' : true}
                  onChange={event => setSelectedType(event.target.value)}
                />
                <Label id="debit" isNormal>Expense</Label>
              </Field>
              <Field isStacked={false}>
                <Input
                  id="credit"
                  name="type"
                  type="radio"
                  required
                  value="credit"
                  defaultChecked={data?.type === 'credit'}
                  onChange={event => setSelectedType(event.target.value)}
                />
                <Label id="credit" isNormal>Income</Label>
              </Field>
            </Group>
          </Field>
          <Field>
            <Label id="transferee">
              {selectedType === 'debit' && 'Transfer as income to (optional)'}
              {selectedType === 'credit' && 'Transfer as expense from (optional)'}
            </Label>
            <Select
              id="transferee"
              name="transferee"
              defaultValue={data?.transferee}
            >
              <option value="">Select ...</option>
              <optgroup label="Financial Accounts">
                {holdings.filter(holding => ACCOUNTS.includes(holding.type)).map((holding) => (
                  <option
                    disabled={holding.id === selectedParent}
                    key={holding.id}
                    value={holding.id || ''}
                  >
                    {holding.name}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Assets">
                {holdings.filter(holding => ASSETS.includes(holding.type)).map((holding) => (
                  <option
                    disabled={holding.id === selectedParent}
                    key={holding.id}
                    value={holding.id || ''}
                  >
                    {holding.name}
                  </option>
                ))}
              </optgroup>
            </Select>
          </Field>
        </Group>
        <Group>
          <Field>
            <Label id="start">Start</Label>
            <Input
              id="start"
              name="start"
              type="date"
              required
              defaultValue={data?.start || format(parseISO(date), DATE_FORMAT)}
            />
          </Field>
          <Field>
            <Label id="end">End (optional)</Label>
            <Input
              id="end"
              name="end"
              type="date"
              min={format(new Date(), DATE_FORMAT)}
              defaultValue={data?.end || ''}
            />
          </Field>
          <Field>
            <Label id="schedule">Frequency</Label>
            <Select
              id="schedule"
              name="schedule"
              required
              defaultValue={data?.schedule}
            >
              <option value="once">Once</option>
              <option value="daily">Daily</option>
              <option value="bi-daily">Every other day</option>
              <option value="weekly">Weekly</option>
              <option value="bi-weekly">Every other week</option>
              <option value="monthly">Monthly</option>
              <option value="bi-monthly">Every other month</option>
              <option value="quarterly">Quarterly</option>
              <option value="bi-annually">Every six months</option>
              <option value="yearly">Yearly</option>
            </Select>
          </Field>
        </Group>
        <Field>
          <Label id="notes">
            Memo (Optional)
          </Label>
          <Input
            placeholder="Max length: 64 Characters"
            id="notes"
            name="notes"
            type="text"
            defaultValue={data?.notes}
            maxLength={64}
          />
        </Field>
        {budget === undefined || budget?.schedule === 'once' ? (
          <Input
            name="update"
            type="text"
            value="none"
            readOnly
            className="hidden"
          />
        ) : (
          <Field>
            <Label id="update">
              How to apply these changes?
            </Label>
            <Field isStacked={false}>
              <Input
                id="all"
                name="update"
                type="radio"
                required
                value="all"
                defaultChecked={data?.update === 'all' || true}
              />
              <Label id="all" isNormal>
                Entire budget (from {format(parseISO(budget.start), 'MM/dd/yyyy')} onwards)
              </Label>
            </Field>
            <hr className="mt-2 border-current/22.5 h-px" />
            <Field isStacked={false}>
              <Input
                id="this"
                name="update"
                type="radio"
                required
                value="this"
                defaultChecked={data?.update === 'this'}
              />
              <Label id="this" isNormal>
                Only this instance (on {format(parseISO(date), 'MM/dd/yyyy')})
              </Label>
            </Field>
            <Field isStacked={false}>
              <Input
                id="prospective"
                name="update"
                type="radio"
                required
                value="prospective"
                defaultChecked={data?.update === 'prospective'}
              />
              <Label id="prospective" isNormal>
                All current and future instances  (from {format(parseISO(date), 'MM/dd/yyyy')} onwards)
              </Label>
            </Field>
            <Field isStacked={false}>
              <Input
                id="future"
                name="update"
                type="radio"
                required
                value="future"
                defaultChecked={data?.update === 'future'}
              />
              <Label id="future" isNormal>
                Only future instances (after {format(parseISO(date), 'MM/dd/yyyy')})
              </Label>
            </Field>
          </Field>
        )}
        <Input
          name="erase"
          type="text"
          value={isErase ? 'true' : 'false'}
          readOnly
          className="hidden"
        />
        <Input
          name="purge"
          type="text"
          value={isPurge ? 'true' : 'false'}
          readOnly
          className="hidden"
        />
      </div>
      <Footer>
        <Button disabled={isPending} isDestructive onClick={handlePurge} type="button">
          Delete Entire Budget
        </Button>
        <div className="flex gap-4">
          {children}
          <Button disabled={isPending} isSoft onClick={handleErase} type="button">
            Delete
          </Button>
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
