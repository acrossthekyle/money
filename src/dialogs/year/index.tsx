'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

import tw, { cs } from '@/styles';
import Ui from '@/ui';

import { useModel } from './model';

type Props = {
  date: string;
  years: any; // todo
};

export default function Dialog({ date, years }: Props) {
  const {
    handleOnMonth,
    handleOnNext,
    handleOnPrevious,
    index,
    instance,
    isActive,
    onBackdrop,
    onCancel,
  } = useModel(years, date);

  return (
    <Ui.Dialog.Dialog
      id="years-dialog"
      instance={instance}
      isActive={isActive}
      onBackdrop={onBackdrop}
      onCancel={onCancel}
    >
      <h2 className="hidden" id="dialog-header">Years</h2>
      <Ui.Dialog.DialogInner isActive={isActive}>
        <div className={styles.upper}>
          <button className={styles.navigate} onClick={handleOnPrevious} type="button">
            <ChevronLeft className={styles.icon} />
          </button>
          <span>{years[index].year}</span>
          <button className={styles.navigate} onClick={handleOnNext} type="button">
            <ChevronRight className={styles.icon} />
          </button>
        </div>
        <ul className={styles.items}>
          {years[index].months.map((month) => (
            <li key={month.id}>
              <button
                className={styles.item}
                disabled={month.isPastMonth}
                onClick={() => handleOnMonth(month.isThisMonth, month.todayISO, month.month, month.year)}
                type="button"
              >
                <h3 className={styles.heading}>{month.name}</h3>
                <div className={styles.days}>
                  {month.days.map((day) => (
                    <span
                      className={
                        cs(
                          styles.day,
                          day.isBeforeToday && styles.faded,
                          day.isToday && styles.hollow,
                          !day.isBeforeToday && day.balance < 0 && styles.negative,
                        )
                      }
                      key={day.iso}
                    />
                  ))}
                </div>
              </button>
            </li>
          ))}
        </ul>
      </Ui.Dialog.DialogInner>
    </Ui.Dialog.Dialog>
  );
};

const styles = tw({
  upper: `
    flex items-center justify-between
    p-4
  `,
  navigate: `
    flex items-center justify-center
    w-9 h-9
    border border-current/22.5
    rounded-md
  `,
  icon: `
    h-4 w-4
    stroke-2
  `,
  items: `
    grid grid-cols-4 gap-4
    mt-4
    px-4 pb-4
    text-center
  `,
  item: `
    w-full h-full
  `,
  heading: `
    mb-2
    uppercase
    text-xs
    font-geist
  `,
  days: `
    grid grid-cols-7 grid-rows-6 gap-y-1
  `,
  day: `
    block
    ml-1.25
    w-1.5 h-1.5
    rounded-full
    bg-(--foreground)/75
  `,
  faded: `
    !bg-(--foreground)/25
  `,
  hollow: `
    !bg-transparent
    border
  `,
  negative: `
    !bg-red-500
  `,
});
