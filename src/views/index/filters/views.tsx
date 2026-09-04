'use client';

import { ACCOUNTS, ASSETS } from '@/constants';
import { OVERVIEWS } from '@/constants/calendar';
import type { Holding } from '@/types';

import {
  ContainerSection,
  ContainerSectionItems,
  ContainerSectionItem,
  ContainerSectionSelect,
  ContainerSectionSelectGroup,
  ContainerSectionSelectOption,
  ContainerSectionIcon,
  ContainerSectionButton,
  ContainerSectionText,
} from './components';

type Props = {
  holdings: Holding[];
  onHolding: (holding: Holding) => void;
  view: string | null;
};

function getDisplayName(holdings: Holding[], view: string | null) {
  if (view.includes('overview')) {
    return OVERVIEWS[view.replace('overview_', '')];
  }

  const holding = holdings.find(holding => holding.id === view);

  if (holding) {
    return `${holding.name} ${!!holding.number ? `***${holding.number}` : ''}`.trim();
  }

  return '';
}

export default function Views({ holdings, onHolding, onView, view }: Props) {
  return (
    <ContainerSection>
      <ContainerSectionItems>
        <ContainerSectionItem>
          <ContainerSectionText>Forecast:</ContainerSectionText>
        </ContainerSectionItem>
        <ContainerSectionItem>
          <ContainerSectionSelect
            className="w-60"
            name="Overview"
            value={getDisplayName(holdings, view)}
            defaultValue={view}
            onChange={onView}
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
              {holdings.filter(holding => ACCOUNTS.includes(holding.type)).map((holding) => (
                <ContainerSectionSelectOption
                  key={holding.id}
                  value={holding.id}
                >
                  {holding.name} ***{holding.number}
                </ContainerSectionSelectOption>
              ))}
            </ContainerSectionSelectGroup>
            <ContainerSectionSelectGroup label="Assets">
              {holdings.filter(holding => ASSETS.includes(holding.type)).map((holding) => (
                <ContainerSectionSelectOption
                  key={holding.id}
                  value={holding.id}
                >
                  {holding.name} {!!holding.number ? `***${holding.number}` : ''}
                </ContainerSectionSelectOption>
              ))}
            </ContainerSectionSelectGroup>
          </ContainerSectionSelect>
        </ContainerSectionItem>
        {!view.includes('overview') && (
          <ContainerSectionItem>
            <ContainerSectionButton onClick={() => onHolding(view)}>
              <ContainerSectionIcon icon="edit" />
              <ContainerSectionText>Edit Account</ContainerSectionText>
            </ContainerSectionButton>
          </ContainerSectionItem>
        )}
        <ContainerSectionItem>
          <ContainerSectionButton onClick={() => onHolding(undefined)}>
            <ContainerSectionIcon icon="plus" />
            <ContainerSectionText>Add New Account</ContainerSectionText>
          </ContainerSectionButton>
        </ContainerSectionItem>
      </ContainerSectionItems>
    </ContainerSection>
  );
};
