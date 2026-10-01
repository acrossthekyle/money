import { Plus } from 'lucide-react';

import tw from '@/styles';
import Ui from '@/ui';

export default function Add() {
  return (
    <Ui.Components.Action
      className={styles.container}
      href="/holdings/holding"
      mode="secondary"
    >
      <Ui.Components.Icon>
        <Plus className={styles.icon} />
      </Ui.Components.Icon>
    </Ui.Components.Action>
  );
};

const styles = tw({
  container: `
    absolute top-16.5 right-3.25 z-10

    md:top-19.5
    md:right-6.25
  `,
  icon: `
    w-4 h-4
    stroke-2
  `,
});
