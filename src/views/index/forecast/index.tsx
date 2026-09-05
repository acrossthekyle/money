'use client';

import { ACCOUNTS, ASSETS } from '@/constants';
import { OVERVIEWS } from '@/constants/calendar';
import type { Holding } from '@/types';

import {
  ContainerSectionItem,
  ContainerSectionSelect,
  ContainerSectionSelectGroup,
  ContainerSectionSelectOption,
  ContainerSectionText,
} from '../components';

import { useModel } from './model';

type Props = {
  holdings: Holding[];
  view: string;
};

export default function Forecast({ holdings, view }: Props) {
  const { value, handleOnView } = useModel(holdings, view);

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
            {OVERVIEWS.map((overview, index) => (
              <ContainerSectionSelectOption
                key={index}
                value={`overview_${index}`}
              >
                {overview}
              </ContainerSectionSelectOption>
            ))}
          </ContainerSectionSelectGroup>
          <ContainerSectionSelectGroup label="Accounts">
            {holdings
              .filter(holding => ACCOUNTS.includes(holding.type))
              .map((holding, index) => (
                <ContainerSectionSelectOption
                  key={index}
                  value={holding.id || ''}
                >
                  {holding.name} ***{holding.number}
                </ContainerSectionSelectOption>
              )
            )}
          </ContainerSectionSelectGroup>
          <ContainerSectionSelectGroup label="Assets">
            {holdings
              .filter(holding => ASSETS.includes(holding.type))
              .map((holding, index) => (
                <ContainerSectionSelectOption
                  key={index}
                  value={holding.id || ''}
                >
                  {holding.name} {!!holding.number ? `***${holding.number}` : ''}
                </ContainerSectionSelectOption>
              )
            )}
          </ContainerSectionSelectGroup>
        </ContainerSectionSelect>
      </ContainerSectionItem>
    </>
  );
};
