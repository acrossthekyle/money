'use client';

import dynamic from 'next/dynamic';

import { MONTHS_FULL } from '@/constants';
import tw from '@/styles';
import type { CalendarDay } from '@/types';
import { currency } from '@/utils';

const Plugin = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

type Props = {
  months: Array<CalendarDay[]>;
};

export default function Chart({ months }: Props) {
  const data = months.map((days, index) => {
    const all = days.filter(({ dateable }) => dateable.isInMonth).map(({ balance }) => balance);

    return {
      x: index + 1,
      y: [all[0], Math.max(...all), Math.min(...all), all[all.length - 1]],
    };
  });

  const balances = months.map(days => {
    const all = days.filter(({ dateable }) => dateable.isInMonth).map(({ balance }) => balance);

    return {
      start: all[0],
      high: Math.max(...all),
      low: Math.min(...all),
      end: all[all.length - 1],
    };
  });

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
            colors: ['var(--foreground)'],
          },
          plotOptions: {
            candlestick: {
              colors: {
                upward: 'var(--foreground)',
                downward: 'var(--foreground)',
              },
              wick: {
                useFillColor: true,
              },
            },
          },
          grid: {
            show: false,
            padding: {
              top: 0,
              bottom: -12,
              right: -16,
              left: -12,
            },
          },
          xaxis: {
            type: 'category',
            categories: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
            labels: {
              style: {
                colors: 'var(--foreground)',
              }
            },
            tickPlacement: 'on',
            axisBorder: {
              show: false,
            },
            axisTicks: {
              show: false,
            },
            crosshairs: {
              stroke: {
                dashArray: 0,
              },
            },
          },
          yaxis: {
            show: false,
          },
          tooltip: {
            fixed: {
              enabled: true,
              position: 'topLeft',
              offsetX: -16,
              offsetY: 0,
            },
            intersect: true,
            shared: false,
            arrow: false,
            marker: {
              show: false,
            },
            custom: function({ dataPointIndex }) {
              const values = balances[dataPointIndex];

              return `
                <div class="${styles.tooltip}">
                  <h3 class="${styles.heading}">
                    ${MONTHS_FULL[dataPointIndex]}
                  </h3>
                  <ul class="${styles.balances}">
                    <li class="${styles.item}">
                      <span class="${styles.title}">Start</span>
                      <span
                        class="${styles.amount} ${values.start > 0 ? styles.positive : styles.negative}"
                      >
                        $${currency(values.start)}
                      </span>
                    </li>
                    <li class="${styles.item}">
                      <span class="${styles.title}">Low</span>
                      <span
                        class="${styles.amount} ${values.low > 0 ? styles.positive : styles.negative}"
                      >
                        $${currency(values.low)}
                      </span>
                    </li>
                    <li class="${styles.item}">
                      <span class="${styles.title}">End</span>
                      <span
                        class="${styles.amount} ${values.end > 0 ? styles.positive : styles.negative}"
                      >
                        $${currency(values.end)}
                      </span>
                    </li>
                    <li class="${styles.item}">
                      <span class="${styles.title}">High</span>
                      <span
                        class="${styles.amount} ${values.high > 0 ? styles.positive : styles.negative}"
                      >
                        $${currency(values.high)}
                      </span>
                    </li>
                  </ul>
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
        type="candlestick"
        height="100%"
      />
    </div>
  );
}

const styles = tw({
  container: `
    relative
    h-36 w-full
    select-none
    touch-none
    mt-8
  `,
  tooltip: `
    !-mt-3
    flex flex-col gap-1
    pl-4
    text-(--foreground)
  `,
  heading: `
    text-sm
    font-bold

    md:text-xs
  `,
  balances: `
    grid grid-cols-2 grid-rows-2 gap-1 gap-x-4
  `,
  item: `
    flex items-center justify-between gap-2
  `,
  title: `
    font-normal
    text-xs
  `,
  amount: `
    !font-roboto
    text-xs
  `,
  negative: `
    text-red-400 dark:text-rose-400
  `,
  positive: `
    text-green-500 dark:text-lime-500
  `,
});

