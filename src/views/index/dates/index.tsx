'use client';

import { addYears, getYear } from 'date-fns';

import {
  ContainerSection,
  ContainerSectionItems,
  ContainerSectionItem,
  ContainerSectionIcon,
  ContainerSectionButton,
  ContainerSectionText,
  ContainerSectionSelect,
  ContainerSectionSelectOption,
} from '../components';

import { useModel } from './model';

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export default function Dates() {
  const {
    handleOnMonth,
    handleOnNext,
    handleOnPrevious,
    handleOnToday,
    handleOnYear,
    isToday,
    month,
    year,
  } = useModel();

  return (
    <ContainerSection>
      <ContainerSectionItems>
        {!isToday && (
          <ContainerSectionItem>
            <ContainerSectionButton onClick={handleOnToday}>
              <ContainerSectionIcon icon="undo" />
              <ContainerSectionText>Today</ContainerSectionText>
            </ContainerSectionButton>
          </ContainerSectionItem>
        )}
        <ContainerSectionItem>
          <ContainerSectionButton onClick={handleOnPrevious}>
            <ContainerSectionIcon icon="left" />
          </ContainerSectionButton>
        </ContainerSectionItem>
        <ContainerSectionItem>
          <ContainerSectionSelect
            className="w-28"
            name="month"
            defaultValue={month}
            display={MONTHS[Number(month)]}
            onChange={handleOnMonth}
          >
            {MONTHS.map((item, index) => (
              <ContainerSectionSelectOption key={index} value={String(index)}>
                {item}
              </ContainerSectionSelectOption>
            ))}
          </ContainerSectionSelect>
        </ContainerSectionItem>
        <ContainerSectionItem>
          <ContainerSectionButton onClick={handleOnNext}>
            <ContainerSectionIcon icon="right" />
          </ContainerSectionButton>
        </ContainerSectionItem>
        <ContainerSectionItem>
          <ContainerSectionSelect
            name="year"
            defaultValue={year}
            display={year}
            onChange={handleOnYear}
          >
            {Array.from({ length: 11 }, (_, index) => (
              <ContainerSectionSelectOption
                key={index}
                value={String(getYear(addYears(new Date(), index)))}
              />
            ))}
          </ContainerSectionSelect>
        </ContainerSectionItem>
      </ContainerSectionItems>
    </ContainerSection>
  );
};
