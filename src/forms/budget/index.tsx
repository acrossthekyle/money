'use client';

import { ACCOUNTS, ASSETS } from '@/constants';
import tw from '@/styles';
import type { Budget, Dateable, Holding } from '@/types';
import Ui from '@/ui';

import {
  Amount,
  Category,
  End,
  Name,
  Notes,
  Schedule,
  Start,
  Transferee,
  Type,
} from './components';
import { useModel } from './model';

type Props = {
  budget?: Budget;
  canFullyUpdate?: boolean;
  date: Dateable;
  holdings: Holding[];
  parent: string;
};

export default function Form({
  budget,
  canFullyUpdate = true,
  date,
  holdings,
  parent,
}: Props) {
  const {
    action,
    canDelete,
    data,
    errors,
    handleOnCancel,
    handleOnContinue,
    handleOnDelete,
    handleOnType,
    isPending,
    type,
    update,
    willPurge,
  } = useModel(date, parent, canFullyUpdate, budget);

  const accounts = holdings.filter(holding => ACCOUNTS.includes(holding.type));
  const assets = holdings.filter(holding => ASSETS.includes(holding.type));

  return (
    <Ui.Form.Container action={action} id="budget-form">
      <Ui.Alerts.Errors items={errors} message="Form validation failed" />
      <Ui.Form.Inner>
        <Name value={data?.name} />
        <Amount value={data?.amount} />
        <Type onChange={handleOnType} value={data?.type} />
        <Category value={data?.category} />
        <Transferee
          accounts={accounts}
          assets={assets}
          holding={parent}
          type={type}
          value={data?.transferee}
        />
        <Start date={date} value={data?.start} />
        <End value={data?.end} />
        <Schedule value={data?.schedule} />
        <Notes value={data?.notes} />
        <input
          name="date"
          type="text"
          value={date.iso}
          readOnly
          className="hidden"
        />
        <input
          name="parent"
          type="text"
          value={parent}
          readOnly
          className="hidden"
        />
        <input
          name="update"
          type="text"
          value={budget === undefined || budget?.schedule === 'once' ? 'this' : update}
          readOnly
          required={budget !== undefined}
          className="hidden"
        />
        <input
          name="purge"
          type="text"
          value={willPurge ? 'true' : 'false'}
          readOnly
          className="hidden"
        />
      </Ui.Form.Inner>
      <Ui.Form.Footer>
        {canDelete ? (
          <Ui.Form.Delete disabled={isPending} onClick={handleOnDelete} />
        ) : <span />}
        <div className={styles.actions}>
          <Ui.Form.Cancel onClick={handleOnCancel} />
          {!budget ? (
            <Ui.Components.Action disabled={isPending} type="submit">
              <Ui.Components.Text left right>
                {isPending ? 'Processing...' : 'Create'}
              </Ui.Components.Text>
            </Ui.Components.Action>
          ) : (
            <Ui.Components.Action onClick={handleOnContinue} type="button">
              <Ui.Components.Text left right>
                {isPending ? 'Processing...' : 'Update'}
              </Ui.Components.Text>
            </Ui.Components.Action>
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
