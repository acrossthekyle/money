'use client';

import tw from '@/styles';

type Props = {
  //
};

export default function Section({ /**/ }: Props) {
  return (
    <section aria-label="income and expenses this month" className={styles.container}>
      Amounts
    </section>
  );
};

const styles = tw({
  container: `
    col-start-9 row-start-1 col-span-8 row-span-2
    bg-green-100
  `,
});
