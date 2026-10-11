import tw from '@/styles';

import {
  Action,
  Text,
} from '../components';

type Props = {
  disabled?: boolean;
  isPending?: boolean;
};

export default function Submit({ disabled, isPending }: Props) {
  return (
    <Action
      className={styles.container}
      disabled={disabled}
      mode="primary"
      type="submit"
    >
      <Text left right>
        {isPending && 'Processing...'}
        {!isPending && 'Submit'}
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
