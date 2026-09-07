'use client';

import { addYears, getYear } from 'date-fns';

import {
  OptionsSection,
  OptionsSectionItems,
  OptionsSectionItem,
  OptionsSectionIcon,
  OptionsSectionButton,
  OptionsSectionText,
  OptionsSectionSelect,
  OptionsSectionSelectOption,
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
    <OptionsSection>
      <OptionsSectionItems>
        {!isToday && (
          <OptionsSectionItem>
            <OptionsSectionButton onClick={handleOnToday}>
              <OptionsSectionIcon icon="undo" />
              <OptionsSectionText>Today</OptionsSectionText>
            </OptionsSectionButton>
          </OptionsSectionItem>
        )}
        <OptionsSectionItem>
          <OptionsSectionButton onClick={handleOnPrevious}>
            <OptionsSectionIcon icon="left" />
          </OptionsSectionButton>
        </OptionsSectionItem>
        <OptionsSectionItem>
          <OptionsSectionSelect
            className="w-28"
            name="month"
            defaultValue={month}
            display={MONTHS[Number(month)]}
            onChange={handleOnMonth}
          >
            {MONTHS.map((item, index) => (
              <OptionsSectionSelectOption key={index} value={String(index)}>
                {item}
              </OptionsSectionSelectOption>
            ))}
          </OptionsSectionSelect>
        </OptionsSectionItem>
        <OptionsSectionItem>
          <OptionsSectionButton onClick={handleOnNext}>
            <OptionsSectionIcon icon="right" />
          </OptionsSectionButton>
        </OptionsSectionItem>
        <OptionsSectionItem>
          <OptionsSectionSelect
            name="year"
            defaultValue={year}
            display={year}
            onChange={handleOnYear}
          >
            {Array.from({ length: 11 }, (_, index) => (
              <OptionsSectionSelectOption
                key={index}
                value={String(getYear(addYears(new Date(), index)))}
              />
            ))}
          </OptionsSectionSelect>
        </OptionsSectionItem>
      </OptionsSectionItems>
    </OptionsSection>
  );
};
