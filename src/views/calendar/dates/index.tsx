'use client';

import { addYears, getYear } from 'date-fns';

import {
  OptionsSection,
  OptionsSectionIcon,
  OptionsSectionButton,
  OptionsSectionText,
  OptionsSectionSelect,
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
      {!isToday && (
        <OptionsSectionButton onClick={handleOnToday}>
          <OptionsSectionIcon icon="undo" />
          <OptionsSectionText>Today</OptionsSectionText>
        </OptionsSectionButton>
      )}
      <OptionsSectionButton onClick={handleOnPrevious}>
        <OptionsSectionIcon icon="left" />
      </OptionsSectionButton>
      <OptionsSectionSelect
        className="w-28"
        name="month"
        defaultValue={month}
        display={MONTHS[Number(month)]}
        onChange={handleOnMonth}
      >
        {MONTHS.map((item, index) => (
          <option key={index} value={String(index)}>
            {item}
          </option>
        ))}
      </OptionsSectionSelect>
      <OptionsSectionButton onClick={handleOnNext}>
        <OptionsSectionIcon icon="right" />
      </OptionsSectionButton>
      <OptionsSectionSelect
        name="year"
        defaultValue={year}
        display={year}
        onChange={handleOnYear}
      >
        {Array.from({ length: 11 }, (_, index) => (
          <option
            key={index}
            value={String(getYear(addYears(new Date(), index)))}
          >
            {String(getYear(addYears(new Date(), index)))}
          </option>
        ))}
      </OptionsSectionSelect>
    </OptionsSection>
  );
};
