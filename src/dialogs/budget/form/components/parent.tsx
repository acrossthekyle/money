'use client';

import { OVERVIEWS } from '@/constants';
import type { Budget, Holding } from '@/types';
import Ui from '@/ui';

type Props = {
  accounts: Holding[];
  assets: Holding[];
  data?: Budget;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  parent: string;
};

type GroupProps = {
  label: string;
  shouldGroup: boolean;
};

function Group({
  children,
  label,
  shouldGroup,
}: React.PropsWithChildren<GroupProps>) {
  if (shouldGroup) {
    return (
      <optgroup label={label}>
        {children}
      </optgroup>
    );
  }

  return (
    <>
      {children}
    </>
  );
}

export default function Parent({
  accounts,
  assets,
  data,
  onChange,
  parent,
}: Props) {
  if (Object.values(OVERVIEWS).includes(parent)) {
    const shouldGroup = accounts.length > 0 && assets.length > 0;

    return (
      <Ui.Form.Field>
        <Ui.Form.Label id="parent">
          Account/Asset
        </Ui.Form.Label>
        <Ui.Form.Select
          id="parent"
          name="parent"
          required
          defaultValue={data?.parent}
          onChange={onChange}
        >
          <option value="">Select ...</option>
          <Group label="Bank Accounts" shouldGroup={shouldGroup}>
            {accounts.map((account) => (
              <option
                disabled={account.id === parent}
                key={account.id}
                value={account.id}
              >
                {account.name}
              </option>
            ))}
          </Group>
          <Group label="Assets" shouldGroup={shouldGroup}>
            {assets.map((asset) => (
              <option
                disabled={asset.id === parent}
                key={asset.id}
                value={asset.id}
              >
                {asset.name}
              </option>
            ))}
          </Group>
        </Ui.Form.Select>
      </Ui.Form.Field>
    );
  }

  return (
    <Ui.Form.Input
      name="parent"
      type="text"
      value={parent}
      readOnly
      className="hidden"
    />
  );
};
