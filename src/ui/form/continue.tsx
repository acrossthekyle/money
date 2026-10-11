import tw from '@/styles';

import {
  Action,
  Text,
} from '../components';

type Props = {
  disabled?: boolean;
  onClick: () => void;
};

export default function Continue({ disabled, onClick }: Props) {
  return (
    <Action
      className={styles.container}
      disabled={disabled}
      mode="primary"
      onClick={onClick}
      type="button"
    >
      <Text left right>
        Continue
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
