'use client';

import dynamic from 'next/dynamic';

import { CARD_RADIUS, TOOLTIP_RADIUS } from '@/constants';
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
            colors: ['#fde047'],
          },
          stroke: {
            curve: 'smooth',
            colors: ['#fde047'],
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
              offsetY: -4,
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
    touch-none
    border border-current/12
    bg-(--foreground)/2

    before:absolute
    before:inset-0
    before:bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)]
    before:bg-[size:24px_24px]

    ${CARD_RADIUS}
  `,
  tooltip: `
    flex flex-col gap-2
    mx-4
    p-3 pt-2.5 pb-2
    bg-(--background)
    text-(--foreground)
    border border-current/12

    ${TOOLTIP_RADIUS}
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
