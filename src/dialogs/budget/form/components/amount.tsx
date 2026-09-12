import tw from '@/styles';
import Ui from '@/ui';

type Props = {
  value?: string;
};

export default function Amount({ value }: Props) {
  return (
    <Ui.Form.Field className={styles.container}>
      <Ui.Form.Currency id="amount" value={value} />
      <Ui.Form.Label htmlFor="amount" isRequired>Amount</Ui.Form.Label>
    </Ui.Form.Field>
  );
};

const styles = tw({
  container: `
    col-span-12
    mr-2

    xs:mr-0
    sm:col-span-7
  `,
});
