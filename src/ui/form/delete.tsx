'use client';

import tw from '@/styles';

import {
  Action,
  Text,
} from '../components';

type Props = {
  disabled?: boolean;
  onClick: () => void;
};

export default function Delete({ disabled, onClick }: Props) {
  return (
    <>
      <span className={styles.divider}>
        <span className={styles.label}>Or</span>
      </span>
      <Action
        className={styles.container}
        disabled={disabled}
        onClick={onClick}
        mode="tertiary"
      >
        <Text left right>
          Delete
        </Text>
      </Action>
    </>
  );
};

const styles = tw({
  divider: `
    relative
    flex items-center justify-center
    w-full
    my-4

    before:h-px
    before:bg-(--foreground)/62.5
    before:absolute
    before:left-0
    before:right-0
    before:-z-1
  `,
  label: `
    inline-block
    px-4
    bg-(--background)
    uppercase
    text-xs text-(--foreground)
  `,
  container: `
    w-full
    justify-center
    h-9
  `,
});
