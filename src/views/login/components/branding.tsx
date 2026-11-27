import { Stone } from 'lucide-react';

import tw from '@/styles';

export default function Branding() {
  return (
    <h1 className={styles.header}>
      <Stone className={styles.stone} />
      Basalt
    </h1>
  );
};

const styles = tw({
  header: `
    flex items-center justify-center gap-2
    mb-2
    font-semibold
  `,
  stone: `
    size-4.5
  `,
});
