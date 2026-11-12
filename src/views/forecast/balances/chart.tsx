'use client';

import dynamic from 'next/dynamic';

import tw from '@/styles';
import { currency } from '@/utils';

const Plugin = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

type Props = {
  data: number[];
};

export default function Chart({ data }: Props) {
  const categories = ['starting', 'lowest', 'highest', 'ending'];

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
              top: -14,
              bottom: -24,
              right: -24,
              left: -24,
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
                dataPointIndex: 1,
                size: 4,
                fillColor: 'var(--background)',
                strokeColor: 'var(--foreground)',
              },
              {
                seriesIndex: 0,
                dataPointIndex: 2,
                size: 4,
                fillColor: 'var(--background)',
                strokeColor: 'var(--foreground)',
              },
              {
                seriesIndex: 0,
                dataPointIndex: 3,
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
                  <p class="${styles.title}">
                    ${categories[dataPointIndex]}
                  </p>
                  <span class="${styles.amount}">
                    <span class="${styles.prefix}">
                      Balance
                    </span>
                    <span class="${value > 0 ? styles.positive : styles.negative}">
                      $${currency(value)}
                    </span>
                  </span>
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
    h-36 w-full
    select-none
    touch-none
    overflow-hidden

    before:absolute
    before:-inset-[2px]
    before:bottom-[2px]
    before:bg-[linear-gradient(to_right,var(--foreground)_1px,transparent_1px),linear-gradient(to_bottom,var(--foreground)_1px,transparent_1px)]
    before:bg-[size:0.9rem_0.9rem]
    before:opacity-10.5

    sm:before:-bottom-[2px]
    sm:before:bg-[size:0.925rem_0.925rem]
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
    text-red-400 dark:text-rose-400
  `,
  positive: `
    text-green-500 dark:text-lime-500
  `,
});

