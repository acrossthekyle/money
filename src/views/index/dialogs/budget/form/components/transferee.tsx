import type { Holding } from '@/types';
import Ui from '@/ui';

type Props = {
  accounts: Holding[];
  assets: Holding[];
  holding: string;
  type: string;
  value?: string;
};

export default function Transferee({
  accounts,
  assets,
  holding,
  type,
  value,
}: Props) {
  if (accounts.length === 0 && assets.length === 0) {
    return null;
  }

  return (
    <Ui.Form.Field>
      <Ui.Form.Label id="transferee">
        {type === 'debit' && 'Transfer as income to (optional)'}
        {type === 'credit' && 'Transfer as expense from (optional)'}
      </Ui.Form.Label>
      <Ui.Form.Select
        id="transferee"
        name="transferee"
        defaultValue={value}
      >
        <option value="">Select ...</option>
        {accounts.length > 0 && (
          <optgroup label="Financial Accounts">
            {accounts.map((account) => (
              <option
                disabled={account.id === holding}
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
                disabled={asset.id === holding}
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
};
