'use client';

import type { Budget, Holding } from '@/types';
import Ui from '@/ui';

type Props = {
  accounts: Holding[];
  assets: Holding[];
  data?: Budget;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  parent: string;
};

export default function Parent({
  accounts,
  assets,
  data,
  onChange,
  parent,
}: Props) {
  if (parent.includes('overview')) {
    return (
      <Ui.Form.Field>
        <Ui.Form.Label id="parent">Holding</Ui.Form.Label>
        <Ui.Form.Select
          id="parent"
          name="parent"
          required
          defaultValue={data?.parent}
          onChange={onChange}
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
