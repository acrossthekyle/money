'use client';

import { ACCOUNTS, ASSETS } from '@/constants';
import tw from '@/styles';
import type { Budget, Holding } from '@/types';
import Ui from '@/ui';

import {
  Amount,
  Category,
  End,
  Name,
  Notes,
  Parent,
  Schedule,
  Start,
  Transferee,
  Type,
} from './components';
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
    canDelete,
    data,
    errors,
    handleOnContinue,
    handleOnDelete,
    handleOnHolding,
    handleOnPurge,
    handleOnType,
    holding,
    isPending,
    type,
    update,
    willDelete,
    willPurge,
  } = useModel(date, onDone, parent, budget);

  const accounts = holdings.filter(holding => ACCOUNTS.includes(holding.type));
  const assets = holdings.filter(holding => ASSETS.includes(holding.type));

  return (
    <Ui.Form.Container action={action} id="budget-form" key={data?.id || date}>
      <Ui.Form.Inner>
        <Ui.Alerts.Errors items={errors} message="Form validation failed" />
        <Ui.Form.Input
          name="date"
          type="text"
          value={date}
          readOnly
          className="hidden"
        />
        <Parent
          accounts={accounts}
          assets={assets}
          data={data}
          onChange={handleOnHolding}
          parent={parent}
        />
        <Ui.Form.Group>
          <Name value={data?.name} />
          <Amount value={data?.amount} />
          <Category value={data?.category} />
        </Ui.Form.Group>
        <Ui.Form.Group>
          <Type onChange={handleOnType} value={data?.type} />
          <Transferee
            accounts={accounts}
            assets={assets}
            holding={holding}
            type={type}
            value={data?.transferee}
          />
        </Ui.Form.Group>
        <Ui.Form.Group>
          <Start date={date} value={data?.start} />
          <End value={data?.end} />
          <Schedule value={data?.schedule} />
        </Ui.Form.Group>
        <Notes value={data?.notes} />
        <Ui.Form.Input
          name="update"
          type="text"
          value={budget === undefined || budget?.schedule === 'once' ? 'none' : update}
          readOnly
          required={budget !== undefined}
          className="hidden"
        />
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
          <div className={styles.actions}>
            <Ui.Form.Button
              disabled={isPending}
              isDestructive
              onClick={handleOnPurge}
            >
              Delete Budget
            </Ui.Form.Button>
            <Ui.Form.Button disabled={isPending} onClick={handleOnDelete}>
              Delete Date
            </Ui.Form.Button>
          </div>
        ) : <div />}
        <div className={styles.actions}>
          <Ui.Form.Button onClick={onClose}>
            Cancel
          </Ui.Form.Button>
          {!budget ? (
            <Ui.Form.Button disabled={isPending} id="submit" type="submit">
              Create
            </Ui.Form.Button>
          ) : (
            <Ui.Form.Button isContinue onClick={handleOnContinue}>
              Submit
            </Ui.Form.Button>
          )}
        </div>
      </Ui.Form.Footer>
    </Ui.Form.Container>
  );
};

const styles = tw({
  actions: `
    flex gap-4
  `,
});
