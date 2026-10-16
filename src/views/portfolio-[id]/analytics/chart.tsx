'use client';

import dynamic from 'next/dynamic';

import tw from '@/styles';
import type { CalendarDay } from '@/types';
import { currency } from '@/utils';

const Plugin = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

type Props = {
  days: CalendarDay[];
};

export default function Chart({ days }: Props) {
  const data = days.map((day) => day.balance);
  const categories = days.map((day) => day.dateable.iso);

  return (
    <div className={styles.container}>
      <Plugin
        options={{
          chart: {
            animations: {
              enabled: false,
            },
            toolbar: {
              show: false,
            },
            dropShadow: {
              enabled: false,
            },
            zoom: {
              enabled: false,
            },
            height: '100%',
            width: '100%',
          },
          legend: {
            show: false,
          },
          dataLabels: {
            enabled: false,
          },
          fill: {
            type: 'solid',
            colors: ['#bef264'],
          },
          stroke: {
            curve: 'smooth',
            colors: ['#bef264'],
          },
          grid: {
            show: false,
            padding: {
              top: 0,
              bottom: -12,
              right: 20,
              left: 18,
            },
          },
          xaxis: {
            type: 'datetime',
            categories,
            tickPlacement: 'on',
            axisBorder: {
              show: false,
            },
            axisTicks: {
              show: false,
            },
            crosshairs: {
              stroke: {
                dashArray: 2,
              },
            },
            labels: {
              formatter: function () {
                return '';
              },
            },
          },
          yaxis: {
            labels: {
              style: {
                colors: ['var(--foreground)'],
              },
              formatter: function (value) {
                return `${value < 0 ? '-' : ''}$${currency(value)}`;
              },
            },
          },
          tooltip: {
            arrow: false,
            marker: {
              show: false,
            },
            custom: function({ series, dataPointIndex }) {
              const value = series[0][dataPointIndex];

              return `
                <div class="${styles.tooltip}">
                  <div class="${styles.date}">
                    ${days[dataPointIndex].dateable.display}
                  </div>
                  <div class="${styles.balance}">
                    <span class="${styles.title}">Balance</span>
                    <span
                      class="${styles.amount} ${value > 0 ? styles.positive : styles.negative}"
                    >
                      $${currency(value)}
                    </span>
                  </div>
                </div>
              `;
            },
          },
        }}
        series={[
          {
            name: '',
            data,
          },
        ]}
        type="area"
        height="100%"
      />
    </div>
  );
}

const styles = tw({
  container: `
    relative
    h-54 w-full
    select-none

    before:absolute
    before:inset-0
    before:bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)]
    before:bg-[size:24px_24px]
  `,
  tooltip: `
    flex flex-col gap-2
    mx-4
    p-3 py-2
    bg-white dark:bg-black
    text-black dark:text-white
    rounded-md
    border border-current/12
  `,
  date: `
    text-xs
  `,
  balance: `
    flex flex-col
  `,
  title: `
    font-bold
  `,
  amount: `
    !font-roboto
  `,
  negative: `
    text-red-400 dark:text-rose-400
  `,
  positive: `
    text-green-500 dark:text-lime-500
  `,
});
