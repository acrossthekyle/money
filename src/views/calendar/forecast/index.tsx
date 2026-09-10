'use client';

import type { Holding } from '@/types';
import tw from '@/styles';

import { OptionsSectionSelect } from '../components';

import { useModel } from './model';
import { getIsOverviewDisabled, getOverviewDisplayText } from './utils';

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
    hasChecking,
    hasCreditCards,
    hasHoldings,
    hasOtherAssets,
    hasRetirement,
    hasSavings,
    handleOnView,
    overviews,
    value,
  } = useModel(holdings, view);

  return (
    <OptionsSectionSelect
      className={styles.container}
      name="Overview"
      defaultValue={view}
      display={value}
      onChange={handleOnView}
    >
      <optgroup label="Overviews">
        {Object.entries(overviews).map(([key, value]) => (
          <option
            disabled={getIsOverviewDisabled(
              value,
              hasAccounts,
              hasAssets,
              hasChecking,
              hasCreditCards,
              hasHoldings,
              hasOtherAssets,
              hasRetirement,
              hasSavings,
            )}
            key={key}
            value={value}
          >
            {getOverviewDisplayText(value)}
          </option>
        ))}
      </optgroup>
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
