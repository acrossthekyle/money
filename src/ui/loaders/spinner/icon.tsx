import { LoaderCircle } from 'lucide-react';

import tw from '@/styles';

export default function Icon() {
  return (
    <LoaderCircle aria-hidden="true" className={styles.container} />
  );
};

const styles = tw({
  container: `
    w-6 h-6
    stroke-2
    animate-spin
  `,
});
