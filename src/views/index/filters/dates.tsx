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
} from './components';
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
    handleMonth,
    handleNext,
    handlePrevious,
    handleToday,
    handleYear,
    isToday,
    month,
    year,
  } = useModel();

  return (
    <ContainerSection>
      <ContainerSectionItems>
        {!isToday && (
          <ContainerSectionItem>
            <ContainerSectionButton onClick={handleToday}>
              <ContainerSectionIcon icon="undo" />
              <ContainerSectionText>Today</ContainerSectionText>
            </ContainerSectionButton>
          </ContainerSectionItem>
        )}
        <ContainerSectionItem>
          <ContainerSectionButton onClick={handlePrevious}>
            <ContainerSectionIcon icon="left" />
          </ContainerSectionButton>
        </ContainerSectionItem>
        <ContainerSectionItem>
          <ContainerSectionSelect
            className="w-28"
            name="month"
            value={MONTHS[month]}
            defaultValue={month}
            onChange={handleMonth}
          >
            {MONTHS.map((item, index) => (
              <ContainerSectionSelectOption key={index} value={index}>
                {item}
              </ContainerSectionSelectOption>
            ))}
          </ContainerSectionSelect>
        </ContainerSectionItem>
        <ContainerSectionItem>
          <ContainerSectionButton onClick={handleNext}>
            <ContainerSectionIcon icon="right" />
          </ContainerSectionButton>
        </ContainerSectionItem>
        <ContainerSectionItem>
          <ContainerSectionSelect
            name="year"
            value={year}
            defaultValue={year}
            onChange={handleYear}
          >
            {Array.from({ length: 11 }, (_, index) => (
              <ContainerSectionSelectOption
                key={index}
                value={getYear(addYears(new Date, index))}
              />
            ))}
          </ContainerSectionSelect>
        </ContainerSectionItem>
      </ContainerSectionItems>
    </ContainerSection>
  );
};
