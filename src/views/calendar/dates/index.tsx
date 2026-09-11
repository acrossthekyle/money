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
    month,
    year,
  } = useModel();

  return (
    <OptionsSection className={styles.section}>
      <OptionsSectionButton className={styles.today} onClick={handleOnToday}>
        <OptionsSectionIcon icon="calendar" />
        <OptionsSectionText className={styles.text}>
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
          className={styles.abbreviated}
          name="month"
          defaultValue={month}
          display={MONTHS[Number(month)].abbreviated}
          onChange={handleOnMonth}
        >
          {MONTHS.map((item, index) => (
            <option key={index} value={String(index)}>
              {item.abbreviated}
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
    !pl-2.25 !pr-2.25
  `,
  text: `
    hidden

    md:block
  `,
  group: `
    flex gap-2
  `,
  left: `
    !pr-2.25
  `,
  right: `
    !pl-2.25 !pr-2
  `,
  full: `
    hidden

    xxs:block
    xxs:w-28
  `,
  abbreviated: `
    w-20

    xxs:hidden
  `,
});
