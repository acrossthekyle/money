'use client';

import tw from '@/styles';
import Ui from '@/ui';

type Props = {
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  value?: string;
};

export default function Type({ onChange, value }: Props) {
  return (
    <Ui.Form.Field className={styles.container}>
      <Ui.Form.Select
        id="income_expense"
        name="type"
        required
        defaultValue={value}
        onChange={onChange}
      >
        <option value="credit">Income</option>
        <option value="debit">Expense</option>
      </Ui.Form.Select>
      <Ui.Form.Label htmlFor="income_expense" isRequired>Type</Ui.Form.Label>
    </Ui.Form.Field>
  );
};

const styles = tw({
  container: `
    col-span-12
    ml-2

    xs:ml-0
    sm:col-span-7
  `,
});
