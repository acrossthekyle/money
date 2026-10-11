'use client';

import tw from '@/styles';

import {
  Action,
  Text,
} from '../components';

type Props = {
  onClick: () => void;
};

export default function Cancel({ onClick }: Props) {
  return (
    <Action className={styles.container} onClick={onClick} mode="secondary">
      <Text left right>
        Cancel
      </Text>
    </Action>
  );
};

const styles = tw({
  container: `
    w-full
    justify-center
    h-9
  `,
});
