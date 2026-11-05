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
  const filtered = days.filter(({ dateable }) => dateable.isInMonth);

  const data = filtered.map((day) => day.balance);
  const categories = filtered.map((day) => day.dateable.iso);

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
          stroke: {
            curve: 'smooth',
            colors: ['var(--foreground)'],
            width: 3,
          },
          grid: {
            show: false,
            padding: {
              top: 0,
              bottom: -12,
              right: 2,
              left: 2,
            },
          },
          xaxis: {
            type: 'category',
            categories,
            tickPlacement: 'between',
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
          markers: {
            size: 0,
            discrete: [
              {
                seriesIndex: 0,
                dataPointIndex: 0,
                size: 4,
                fillColor: 'var(--background)',
                strokeColor: 'var(--foreground)',
              },
              {
                seriesIndex: 0,
                dataPointIndex: filtered.length - 1,
                size: 4,
                fillColor: 'var(--background)',
                strokeColor: 'var(--foreground)',
              }
            ],
            strokeWidth: 3,
            hover: {
              size: 4,
            },
          },
          yaxis: {
            show: false,
          },
          tooltip: {
            arrow: false,
            marker: {
              show: false,
            },
            intersect: false,
            shared: true,
            custom: function({ series, dataPointIndex }) {
              const value = series[0][dataPointIndex];

              return `
                <div class="${styles.tooltip}">
                  <div class="${styles.date}">
                    ${filtered[dataPointIndex].dateable.display}
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
        type="line"
        height="100%"
      />
    </div>
  );
}

const styles = tw({
  container: `
    relative
    h-54 w-full
    mt-4
    select-none
    touch-none
  `,
  tooltip: `
    flex flex-col gap-2
    mx-4
    p-3 pt-2.5 pb-2
    bg-(--background)
    text-(--foreground)
    border border-current/12
    rounded-lg
  `,
  date: `
    text-sm

    md:text-xs
  `,
  balance: `
    flex flex-col
  `,
  title: `
    font-bold
    text-base

    md:text-sm
  `,
  amount: `
    !font-roboto
    text-base

    md:text-sm
  `,
  negative: `
    text-red-400 dark:text-rose-400
  `,
  positive: `
    text-green-500 dark:text-lime-500
  `,
});

