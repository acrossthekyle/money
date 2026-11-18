'use client';

import dynamic from 'next/dynamic';

import tw from '@/styles';
import { currency } from '@/utils';

import type { Balances } from './types';

const Plugin = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

type Props = {
  balances: Balances[];
};

export default function Chart({ balances }: Props) {
  const categories = balances.map(({ month }) => month);

  const series = [
    {
      name: 'Start',
      data: balances.map((item) => item.start),
    },
    {
      name: 'Average',
      data: balances.map((item) => item.average),
    },
    {
      name: 'End',
      data: balances.map((item) => item.end),
    },
  ];

  return (
    <div className={styles.container}>
      <Plugin
        options={{
          chart: {
            stacked: true,
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
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '70%',
              borderRadius: 3,
              borderRadiusApplication: 'end',
            },
          },
          colors: [
            'var(--foreground)',
            'color-mix(in srgb, var(--foreground) 60%, transparent)',
            'color-mix(in srgb, var(--foreground) 30%, transparent)',
          ],
          stroke: {
            show: true,
            width: 0.5,
            colors: ['var(--background)'],
          },
          grid: {
            show: false,
            padding: {
              top: 0,
              bottom: -32,
              right: -6,
              left: 0,
            },
          },
          xaxis: {
            type: 'category',
            categories,
            crosshairs: {
              show: false,
            },
            axisBorder: {
              show: false,
            },
            axisTicks: {
              show: false,
            },
            labels: {
              show: true,
              offsetY: -4,
              style: {
                colors: 'transparent',
                fontSize: '1rem',
                fontFamily: 'inherit',
              },
              formatter: (value: string) => value.split('')[0],
            },
          },
          yaxis: {
            show: false,
          },
          tooltip: {
            intersect: false,
            shared: true,
            custom: function({ series, dataPointIndex, w }) {
              const title = `${balances[dataPointIndex].month} ${balances[dataPointIndex].year}`;

              const rows = series
                .map((series: number[], index: number) => {
                  const value = series[dataPointIndex];
                  const label = w.globals.seriesNames[index];

                  return `
                    <span class="${styles.amount}">
                      <span class="${styles.prefix}">${label}</span>
                      <span class="${value > 0 ? styles.positive : styles.negative}">
                        $${currency(value, true)}
                      </span>
                    </span>
                  `;
                })
                .join('');

              return `
                <div class="${styles.tooltip}">
                  <p class="${styles.title}">${title}</p>
                  ${rows}
                </div>
              `;
            },
          },
        }}
        series={series}
        type="bar"
        height="100%"
      />
    </div>
  );
}

const styles = tw({
  container: `
    relative
    h-32
    w-full
    select-none
    touch-none
    overflow-hidden

    before:absolute
    before:inset-0
    before:bg-[linear-gradient(to_right,transparent_calc(50%-0.5px),var(--foreground)_calc(50%-0.5px),var(--foreground)_calc(50%+0.5px),transparent_calc(50%+0.5px)),linear-gradient(to_bottom,transparent_calc(50%-0.5px),var(--foreground)_calc(50%-0.5px),var(--foreground)_calc(50%+0.5px),transparent_calc(50%+0.5px))]
    before:bg-[size:0.925rem_0.925rem]
    before:bg-center
    before:bg-round
    before:opacity-[0.105]
  `,
  tooltip: `
    flex flex-col gap-0.5
    p-2
    bg-(--background)
    text-(--foreground)
    rounded-lg
  `,
  title: `
    text-sm
    capitalize

    sm:text-xs
  `,
  amount: `
    flex justify-between gap-6
    text-sm

    sm:text-xs
  `,
  prefix: `
    text-current/62.5
  `,
  negative: `
    text-red-400

    dark:text-rose-400
  `,
  positive: `
    text-green-500

    dark:text-lime-500
  `,
});

