import tw from '@/styles';
import Ui from '@/ui';

type Props = {
  value?: string;
};

export default function Category({ value }: Props) {
  return (
    <Ui.Form.Field className={styles.container}>
      <Ui.Form.Label id="category">Category</Ui.Form.Label>
      <Ui.Form.Select
        id="category"
        name="category"
        required
        defaultValue={value}
      >
        <option value="subscription">Subscription</option>
        <option value="food">Food</option>
        <option value="income">Income</option>
        <option value="transfer">Transfer</option>
        <option value="utility">Utility</option>
        <option value="health">Health</option>
        <option value="insurance">Insurance</option>
        <option value="taxes">Taxes</option>
        <option value="payment">Payment</option>
      </Ui.Form.Select>
    </Ui.Form.Field>
  );
};

const styles = tw({
  container: `
    !w-62
  `,
});
