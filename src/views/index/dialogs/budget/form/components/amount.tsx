import tw from '@/styles';
import Ui from '@/ui';

type Props = {
  value?: string;
};

export default function Amount({ value }: Props) {
  return (
    <Ui.Form.Field className={styles.container}>
      <Ui.Form.Label id="amount">Amount</Ui.Form.Label>
      <Ui.Form.Currency id="amount" value={value} />
    </Ui.Form.Field>
  );
};

const styles = tw({
  container: `
    !w-26
  `,
});
