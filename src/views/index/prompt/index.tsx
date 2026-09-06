'use client';

import { Plus } from 'lucide-react';

import tw from '@/styles';

type Props = {
  onClick: () => void;
};

export default function Prompt({ onClick }: Props) {
  return (
    <>
      <div className={styles.backdrop} role="presentation" />
      <div
        aria-live="polite"
        aria-label="welcome, start here"
        className={styles.container}
      >
        <h1 className={styles.header}>Money: A Free Budgeting Application</h1>
        <p className={styles.paragraph}>
          This is a financial tool based on bank accounts and asset that helps with budgeting repeating expenses by calculating and forecasting their balances month-by-month, and up to as much as 10 years.
        </p>
        <p className={styles.paragraph}>
          Each of these bank accounts or assets are referred to as <span className={styles.emphasis}>Forecasts</span>, with each having their own series of <span className={styles.emphasis}>Budgets</span>. These can include monthly streaming payments, cell phone bills, random shopping sprees, etc.
        </p>
        <p className={styles.paragraph}>
          <strong>Disclaimer:</strong> All <span className={styles.emphasis}>Forecasts</span> starting balances, and budget amounts, need to be manually updated; there is no integration with financial platforms.
        </p>
        <p className={styles.paragraph}>
          Click or tap the button below to get started.
        </p>
        <button className={styles.button} onClick={onClick} type="button">
          <span>Add Forecast</span>
          <Plus className={styles.icon} />
        </button>
      </div>
    </>
  );
};

const styles = tw({
  backdrop: `
    absolute inset-0 top-12 z-100
    bg-(--background)/33
    backdrop-blur-sm
  `,
  container: `
    absolute left-1/2 top-1/2 z-200
    -translate-x-1/2 -translate-y-1/2
    flex flex-col gap-4
    w-full max-w-md
    bg-(--background)
    border border-current/12.5
    rounded-md
    p-4 px-6
    text-sm
  `,
  header: `
    mt-2
    font-black
    uppercase
    text-xs
  `,
  paragraph: `
    leading-[1.6]
  `,
  button: `
    flex items-center gap-2
    w-fit
    mt-2 mb-3
    bg-(--foreground)/80
    border border-(--foreground)/22.5
    px-3 py-1
    rounded-full
    font-bold
    text-tiny text-(--background)
    uppercase

    motion-safe:duration-300

    hover:bg-(--foreground)/90
  `,
  icon: `
    w-3 h-3
    stroke-3
  `,
  emphasis: `
    font-black
    italic
  `,
});
