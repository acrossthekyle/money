'use client';

import tw, { cs } from '@/styles';
import Ui from '@/ui';

type Props = {
  isClickable: boolean;
  onClick: () => void;
};

export default function Wrapper({
  children,
  isClickable,
  onClick,
}: React.PropsWithChildren<Props>) {
  if (isClickable) {
    return (
      <Ui.Components.Card.Content isPadded={false}>
        <button
          className={cs(styles.container, styles.hoverable)}
          onClick={onClick}
          type="button"
        >
          {children}
        </button>
      </Ui.Components.Card.Content>
    );
  }

  return (
    <Ui.Components.Card.Content isPadded={false}>
      <span className={styles.container}>
        {children}
      </span>
    </Ui.Components.Card.Content>
  );
};

const styles = tw({
  container: `
    group
    relative
    flex flex-col items-start gap-1
    p-4
    w-full
  `,
  hoverable: `
    motion-safe:duration-200

    hover:bg-neutral-200
    hover:dark:bg-neutral-800
  `,
});
