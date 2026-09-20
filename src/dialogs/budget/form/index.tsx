'use client';

import { Check, ChevronRight, LoaderCircle, Trash, Undo2 } from 'lucide-react';

import { ACCOUNTS, ASSETS } from '@/constants';
import tw, { cs } from '@/styles';
import type { Budget, Holding } from '@/types';
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
  date: string;
  holdings: Holding[];
  onClose: () => void;
  parent: string;
};

export default function Form({
  budget,
  date,
  holdings,
  onClose,
  parent,
}: Props) {
  const {
    action,
    canDelete,
    data,
    errors,
    handleOnContinue,
    handleOnDelete,
    handleOnType,
    isPending,
    type,
    update,
    willDelete,
    willPurge,
  } = useModel(date, budget);

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
          value={date}
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
          name="erase"
          type="text"
          value={willDelete ? 'true' : 'false'}
          readOnly
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
          <div className={styles.actions}>
            <Ui.Form.Button
              disabled={isPending}
              onClick={handleOnDelete}
              type="button"
            >
              <Trash className={styles.icon} />
            </Ui.Form.Button>
          </div>
        ) : <div />}
        <div className={styles.actions}>
          <Ui.Form.Button onClick={onClose}>
            <Undo2 className={styles.icon} />
          </Ui.Form.Button>
          {!budget ? (
            <Ui.Form.Button disabled={isPending} id="submit" type="submit">
              {isPending ? (
                <LoaderCircle className={cs(styles.icon, styles.spin)} />
              ) : (
                <Check className={styles.icon} />
              )}
            </Ui.Form.Button>
          ) : (
            <Ui.Form.Button onClick={handleOnContinue}>
              {isPending ? (
                <LoaderCircle className={cs(styles.icon, styles.spin)} />
              ) : (
                <ChevronRight className={styles.icon} />
              )}
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
  icon: `
    w-5 h-5
    stroke-1
  `,
  spin: `
    animate-spin
  `,
});
