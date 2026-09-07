'use client';

import type { Holding } from '@/types';

import {
  ContainerSectionItem,
  ContainerSectionSelect,
  ContainerSectionSelectGroup,
  ContainerSectionSelectOption,
  ContainerSectionText,
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
      <ContainerSectionItem>
        <ContainerSectionText>Forecast:</ContainerSectionText>
      </ContainerSectionItem>
      <ContainerSectionItem>
        <ContainerSectionSelect
          className="w-60"
          name="Overview"
          defaultValue={view}
          display={value}
          onChange={handleOnView}
        >
          <ContainerSectionSelectGroup label="Overviews">
            {Object.entries(overviews).map(([key, value]) => (
              <ContainerSectionSelectOption
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
              </ContainerSectionSelectOption>
            ))}
          </ContainerSectionSelectGroup>
          {hasAccounts && (
            <ContainerSectionSelectGroup label="Accounts">
              {accounts.map((holding, index) => (
                <ContainerSectionSelectOption
                  key={index}
                  value={holding.id || ''}
                >
                  {holding.name} ***{holding.number}
                </ContainerSectionSelectOption>
              ))}
            </ContainerSectionSelectGroup>
          )}
          {hasAssets && (
            <ContainerSectionSelectGroup label="Assets">
              {assets.map((holding, index) => (
                <ContainerSectionSelectOption
                  key={index}
                  value={holding.id || ''}
                >
                  {holding.name} {!!holding.number ? `***${holding.number}` : ''}
                </ContainerSectionSelectOption>
              ))}
            </ContainerSectionSelectGroup>
          )}
        </ContainerSectionSelect>
      </ContainerSectionItem>
    </>
  );
};
