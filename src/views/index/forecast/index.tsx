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
import { getIsOverviewDisabled } from './utils';

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
            {overviews.map((overview, index) => (
              <ContainerSectionSelectOption
                isDisabled={getIsOverviewDisabled(
                  overview,
                  hasAccounts,
                  hasAssets,
                  hasChecking,
                  hasCreditCards,
                  hasHoldings,
                  hasRetirement,
                  hasSavings,
                )}
                key={index}
                value={`overview_${index}`}
              >
                {overview}
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
