'use client';

import type { Holding } from '@/types';
import tw from '@/styles';

import { OptionsSectionSelect } from '../components';

import { useModel } from './model';

type Props = {
  holdings: Holding[];
  view: string;
};

export default function Forecast({ holdings, view }: Props) {
  const {
    accounts,
    assets,
    hasAccounts,
    hasAssets,
    handleOnView,
    value,
  } = useModel(holdings, view);

  return (
    <OptionsSectionSelect
      className={styles.container}
      name="forecast"
      defaultValue={view}
      display={value}
      onChange={handleOnView}
    >
      {hasAccounts && (
        <optgroup label="Bank Accounts">
          {accounts.map((holding, index) => (
            <option key={index} value={holding.id || ''}>
              {holding.name} {!!holding.number ? `... ${holding.number}` : ''}
            </option>
          ))}
        </optgroup>
      )}
      {hasAssets && (
        <optgroup label="Assets">
          {assets.map((holding, index) => (
            <option key={index} value={holding.id || ''}>
              {holding.name} {!!holding.number ? `... ${holding.number}` : ''}
            </option>
          ))}
        </optgroup>
      )}
    </OptionsSectionSelect>
  );
};

const styles = tw({
  container: `
    order-0
    !w-full

    md:!w-56
  `,
});
