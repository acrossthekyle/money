'use client';

import type { Holding } from '@/types';

import {
  OptionsSectionItem,
  OptionsSectionSelect,
  OptionsSectionSelectGroup,
  OptionsSectionSelectOption,
  OptionsSectionText,
} from '../components';

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
    <>
      <OptionsSectionItem>
        <OptionsSectionText>Forecast:</OptionsSectionText>
      </OptionsSectionItem>
      <OptionsSectionItem>
        <OptionsSectionSelect
          className="w-60"
          name="Overview"
          defaultValue={view}
          display={value}
          onChange={handleOnView}
        >
          <OptionsSectionSelectGroup label="Overviews">
            {Object.entries(overviews).map(([key, value]) => (
              <OptionsSectionSelectOption
                isDisabled={getIsOverviewDisabled(
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
              </OptionsSectionSelectOption>
            ))}
          </OptionsSectionSelectGroup>
          {hasAccounts && (
            <OptionsSectionSelectGroup label="Accounts">
              {accounts.map((holding, index) => (
                <OptionsSectionSelectOption
                  key={index}
                  value={holding.id || ''}
                >
                  {holding.name} ***{holding.number}
                </OptionsSectionSelectOption>
              ))}
            </OptionsSectionSelectGroup>
          )}
          {hasAssets && (
            <OptionsSectionSelectGroup label="Assets">
              {assets.map((holding, index) => (
                <OptionsSectionSelectOption
                  key={index}
                  value={holding.id || ''}
                >
                  {holding.name} {!!holding.number ? `***${holding.number}` : ''}
                </OptionsSectionSelectOption>
              ))}
            </OptionsSectionSelectGroup>
          )}
        </OptionsSectionSelect>
      </OptionsSectionItem>
    </>
  );
};
