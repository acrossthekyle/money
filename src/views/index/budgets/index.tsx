'use client';

import tw from '@/styles';

type Props = {
  //
};

export default function Section({ /**/ }: Props) {
  return (
    <section aria-label="budgets for selected day" className={styles.container}>
      Budgets
    </section>
  );
};

const styles = tw({
  container: `
    col-start-17 row-start-1 col-span-8 row-span-12
    bg-black/25
  `,
});
