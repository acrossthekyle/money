'use client';

import { format, parseISO } from 'date-fns';

import { ACCOUNTS, ASSETS, DATE_FORMAT } from '@/constants';
import tw from '@/styles';
import type { Budget, Holding } from '@/types';
import Ui from '@/ui';

import { useModel } from './model';

type Props = {
  budget?: Budget;
  date: string;
  holdings: Holding[];
  onClose: () => void;
  onDone: () => void;
  parent: string;
};

export default function Form({
  budget,
  date,
  holdings,
  onClose,
  onDone,
  parent,
}: Props) {
  const {
    action,
    canContinue,
    canDelete,
    data,
    errors,
    handleOnBack,
    handleOnContinue,
    handleOnDelete,
    handleOnPurge,
    handleOnType,
    handleOnUpdate,
    hasContinued,
    isPending,
    type,
    update,
    willDelete,
    willPurge,
  } = useModel(date, onDone, budget);

  const accounts = holdings.filter(holding => ACCOUNTS.includes(holding.type))
  const assets = holdings.filter(holding => ASSETS.includes(holding.type))

  return (
    <Ui.Form.Container action={action} id="budget-form" key={data?.id || date}>
      <Ui.Form.Inner>
        <Ui.Alerts.Errors items={errors} message="Form validation failed" />
        <div className={styles.initial(canContinue ? hasContinued : false)}>
          <Ui.Form.Input
            name="date"
            type="text"
            value={date}
            readOnly
            className="hidden"
          />
          {!parent.includes('overview') ? (
            <Ui.Form.Input
              name="parent"
              type="text"
              value={parent}
              readOnly
              className="hidden"
            />
          ) : (
            <Ui.Form.Field>
              <Ui.Form.Label id="parent">Holding</Ui.Form.Label>
              <Ui.Form.Select
                id="parent"
                name="parent"
                required
                defaultValue={data?.parent}
              >
                <option value="">Select ...</option>
                {accounts.length > 0 && (
                  <optgroup label="Financial Accounts">
                    {accounts.map((account) => (
                      <option
                        disabled={account.id === parent}
                        key={account.id}
                        value={account.id}
                      >
                        {account.name}
                      </option>
                    ))}
                  </optgroup>
                )}
                {assets.length > 0 && (
                  <optgroup label="Assets">
                    {assets.map((asset) => (
                      <option
                        disabled={asset.id === parent}
                        key={asset.id}
                        value={asset.id}
                      >
                        {asset.name}
                      </option>
                    ))}
                  </optgroup>
                )}
              </Ui.Form.Select>
            </Ui.Form.Field>
          )}
          <Ui.Form.Group>
            <Ui.Form.Field>
              <Ui.Form.Label id="name">Name</Ui.Form.Label>
              <Ui.Form.Input
                id="name"
                name="name"
                type="text"
                required
                defaultValue={data?.name}
                placeholder="Max length: 36 characters"
                maxLength={36}
              />
            </Ui.Form.Field>
            <Ui.Form.Field className={styles.amount}>
              <Ui.Form.Label id="amount">Amount</Ui.Form.Label>
              <Ui.Form.Currency id="amount" value={data?.amount} />
            </Ui.Form.Field>
            <Ui.Form.Field className={styles.category}>
              <Ui.Form.Label id="category">Category</Ui.Form.Label>
              <Ui.Form.Select
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
              </Ui.Form.Select>
            </Ui.Form.Field>
          </Ui.Form.Group>
          <Ui.Form.Group>
            <Ui.Form.Field className={styles.type}>
              <Ui.Form.Label id="type">Type</Ui.Form.Label>
              <Ui.Form.Group>
                <Ui.Form.Field isStacked={false}>
                  <Ui.Form.Input
                    id="debit"
                    name="type"
                    type="radio"
                    required
                    value="debit"
                    defaultChecked={data?.type === 'debit' || true}
                    onChange={handleOnType}
                  />
                  <Ui.Form.Label id="debit" isNormal>Expense</Ui.Form.Label>
                </Ui.Form.Field>
                <Ui.Form.Field isStacked={false}>
                  <Ui.Form.Input
                    id="credit"
                    name="type"
                    type="radio"
                    required
                    value="credit"
                    defaultChecked={data?.type === 'credit'}
                    onChange={handleOnType}
                  />
                  <Ui.Form.Label id="credit" isNormal>Income</Ui.Form.Label>
                </Ui.Form.Field>
              </Ui.Form.Group>
            </Ui.Form.Field>
            {holdings.length > 1 && (
              <Ui.Form.Field>
                <Ui.Form.Label id="transferee">
                  {type === 'debit' && 'Transfer as income to (optional)'}
                  {type === 'credit' && 'Transfer as expense from (optional)'}
                </Ui.Form.Label>
                <Ui.Form.Select
                  id="transferee"
                  name="transferee"
                  defaultValue={data?.transferee}
                >
                  <option value="">Select ...</option>
                  {accounts.length > 0 && (
                    <optgroup label="Financial Accounts">
                      {accounts.map((account) => (
                        <option
                          disabled={account.id === parent}
                          key={account.id}
                          value={account.id}
                        >
                          {account.name}
                        </option>
                      ))}
                    </optgroup>
                  )}
                  {assets.length > 0 && (
                    <optgroup label="Assets">
                      {assets.map((asset) => (
                        <option
                          disabled={asset.id === parent}
                          key={asset.id}
                          value={asset.id}
                        >
                          {asset.name}
                        </option>
                      ))}
                    </optgroup>
                  )}
                </Ui.Form.Select>
              </Ui.Form.Field>
            )}
          </Ui.Form.Group>
          <Ui.Form.Group>
            <Ui.Form.Field>
              <Ui.Form.Label id="start">Start</Ui.Form.Label>
              <Ui.Form.Input
                id="start"
                name="start"
                type="date"
                required
                defaultValue={data?.start || format(parseISO(date), DATE_FORMAT)}
              />
            </Ui.Form.Field>
            <Ui.Form.Field>
              <Ui.Form.Label id="end">End (optional)</Ui.Form.Label>
              <Ui.Form.Input
                id="end"
                name="end"
                type="date"
                min={format(new Date(), DATE_FORMAT)}
                defaultValue={data?.end || ''}
              />
            </Ui.Form.Field>
            <Ui.Form.Field>
              <Ui.Form.Label id="schedule">Frequency</Ui.Form.Label>
              <Ui.Form.Select
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
              </Ui.Form.Select>
            </Ui.Form.Field>
          </Ui.Form.Group>
          <Ui.Form.Field>
            <Ui.Form.Label id="notes">
              Memo (Optional)
            </Ui.Form.Label>
            <Ui.Form.Input
              placeholder="Max length: 64 Characters"
              id="notes"
              name="notes"
              type="text"
              defaultValue={data?.notes}
              maxLength={64}
            />
          </Ui.Form.Field>
        </div>
        <div className={styles.confirm(canContinue ? hasContinued : false)}>
          {budget === undefined || budget?.schedule === 'once' ? (
            <Ui.Form.Input
              name="update"
              type="text"
              value="none"
              readOnly
              className="hidden"
            />
          ) : (
            <Ui.Form.Field>
              <Ui.Form.Label id="update">
                How to apply these changes?
              </Ui.Form.Label>
              <Ui.Form.Field isStacked={false}>
                <Ui.Form.Input
                  id="all"
                  name="update"
                  type="radio"
                  required
                  value="all"
                  defaultChecked={update === 'all'}
                  onChange={handleOnUpdate}
                />
                <Ui.Form.Label id="all" isNormal>
                  Entire budget (from {format(parseISO(budget.start), 'MM/dd/yyyy')} onwards)
                </Ui.Form.Label>
              </Ui.Form.Field>
              <hr className="mt-2 border-current/22.5 h-px" />
              <Ui.Form.Field isStacked={false}>
                <Ui.Form.Input
                  id="this"
                  name="update"
                  type="radio"
                  required
                  value="this"
                  defaultChecked={update === 'this'}
                  onChange={handleOnUpdate}
                />
                <Ui.Form.Label id="this" isNormal>
                  Only this instance (on {format(parseISO(date), 'MM/dd/yyyy')})
                </Ui.Form.Label>
              </Ui.Form.Field>
              <Ui.Form.Field isStacked={false}>
                <Ui.Form.Input
                  id="prospective"
                  name="update"
                  type="radio"
                  required
                  value="prospective"
                  defaultChecked={update === 'prospective'}
                  onChange={handleOnUpdate}
                />
                <Ui.Form.Label id="prospective" isNormal>
                  All current and future instances  (from {format(parseISO(date), 'MM/dd/yyyy')} onwards)
                </Ui.Form.Label>
              </Ui.Form.Field>
              <Ui.Form.Field isStacked={false}>
                <Ui.Form.Input
                  id="future"
                  name="update"
                  type="radio"
                  required
                  value="future"
                  defaultChecked={update === 'future'}
                  onChange={handleOnUpdate}
                />
                <Ui.Form.Label id="future" isNormal>
                  Only future instances (after {format(parseISO(date), 'MM/dd/yyyy')})
                </Ui.Form.Label>
              </Ui.Form.Field>
            </Ui.Form.Field>
          )}
        </div>
        <Ui.Form.Input
          name="erase"
          type="text"
          value={willDelete ? 'true' : 'false'}
          readOnly
          className="hidden"
        />
        <Ui.Form.Input
          name="purge"
          type="text"
          value={willPurge ? 'true' : 'false'}
          readOnly
          className="hidden"
        />
      </Ui.Form.Inner>
      <Ui.Form.Footer>
        {canDelete ? (
          <Ui.Form.Button
            disabled={isPending}
            isDestructive
            onClick={handleOnPurge}
          >
            Delete Budget
          </Ui.Form.Button>
        ) : <span />}
        <div className={styles.ctas}>
          {!hasContinued ? (
            <Ui.Form.Button onClick={onClose}>
              Cancel
            </Ui.Form.Button>
          ) : (
            <Ui.Form.Button onClick={handleOnBack}>
              Back
            </Ui.Form.Button>
          )}
          {canDelete && (
            <Ui.Form.Button
              disabled={isPending}
              isSoft
              onClick={handleOnDelete}
            >
              Delete
            </Ui.Form.Button>
          )}
          {canContinue && !hasContinued ? (
            <Ui.Form.Button isContinue onClick={handleOnContinue}>
              Continue
            </Ui.Form.Button>
          ) : (
            <Ui.Form.Button disabled={isPending} id="submit" type="submit">
              Submit
            </Ui.Form.Button>
          )}
        </div>
      </Ui.Form.Footer>
    </Ui.Form.Container>
  );
};

const styles = tw({
  ctas: `
    flex gap-4
  `,
  amount: `
    !w-26
  `,
  type: `
    !w-44
  `,
  category: `
    !w-62
  `,
  initial: (hasContinued: boolean) => tw(`
    flex-col gap-4

    ${hasContinued ? 'hidden' : 'flex'}
  `),
  confirm: (hasContinued: boolean) => tw(`
    flex-col gap-4

    ${hasContinued ? 'flex' : 'hidden'}
  `),
});
