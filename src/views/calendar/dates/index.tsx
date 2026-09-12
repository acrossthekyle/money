'use client';

import { addYears, getYear } from 'date-fns';

import tw from '@/styles';

import {
  OptionsSection,
  OptionsSectionIcon,
  OptionsSectionButton,
  OptionsSectionText,
  OptionsSectionSelect,
} from '../components';

import { useModel } from './model';

const MONTHS = [
  {
    abbreviated: 'Jan',
    full: 'January',
  },
  {
    abbreviated: 'Feb',
    full: 'February',
  },
  {
    abbreviated: 'March',
    full: 'March',
  },
  {
    abbreviated: 'April',
    full: 'April',
  },
  {
    abbreviated: 'May',
    full: 'May',
  },
  {
    abbreviated: 'June',
    full: 'June',
  },
  {
    abbreviated: 'July',
    full: 'July',
  },
  {
    abbreviated: 'Aug',
    full: 'August',
  },
  {
    abbreviated: 'Sept',
    full: 'September',
  },
  {
    abbreviated: 'Oct',
    full: 'October',
  },
  {
    abbreviated: 'Nov',
    full: 'November',
  },
  {
    abbreviated: 'Dec',
    full: 'December',
  },
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
    <OptionsSection className={styles.section}>
      <OptionsSectionButton
        canDim={isToday}
        className={styles.today}
        onClick={handleOnToday}
      >
        <OptionsSectionIcon canDim={isToday} icon="calendar" />
        <OptionsSectionText canDim={isToday} className={styles.text}>
          Today
        </OptionsSectionText>
      </OptionsSectionButton>
      <div className={styles.group}>
        <OptionsSectionButton className={styles.left} onClick={handleOnPrevious}>
          <OptionsSectionIcon icon="left" />
        </OptionsSectionButton>
        <OptionsSectionSelect
          className={styles.full}
          name="month"
          defaultValue={month}
          display={MONTHS[Number(month)].full}
          onChange={handleOnMonth}
        >
          {MONTHS.map((item, index) => (
            <option key={index} value={String(index)}>
              {item.full}
            </option>
          ))}
        </OptionsSectionSelect>
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
        <OptionsSectionButton className={styles.right} onClick={handleOnNext}>
          <OptionsSectionIcon icon="right" />
        </OptionsSectionButton>
      </div>
    </OptionsSection>
  );
};

const styles = tw({
  section: `
    justify-between

    md:justify-end
  `,
  today: `
    !pl-3 !pr-3
  `,
  text: `
    hidden

    xs:block
  `,
  group: `
    flex gap-2
  `,
  left: `
    hidden
    !pr-3

    xxs:block
  `,
  right: `
    hidden
    !pl-3 !pr-3

    xxs:block
  `,
  full: `
    xxs:w-28
  `,
});
