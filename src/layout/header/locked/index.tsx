import { Lock } from 'lucide-react';

import tw from '@/styles';

export default function Locked() {
  return (
    <Lock className={styles.icon} />
  );
};

const styles = tw({
  icon: `
    w-4.5 h-4.5
    ml-2
    stroke-2

    md:w-3.5
    md:h-3.5
  `,
});
