'use client';

import tw from '@/styles';
import Ui from '@/ui';

type Props = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
};

export default function Type({ onChange, value }: Props) {
  return (
    <Ui.Form.Field className={styles.container}>
      <Ui.Form.Label id="type">Type</Ui.Form.Label>
      <Ui.Form.Group>
        <Ui.Form.Field isStacked={false}>
          <Ui.Form.Input
            id="debit"
            name="type"
            type="radio"
            required
            value="debit"
            defaultChecked={value === 'debit' || true}
            onChange={onChange}
          />
          <Ui.Form.Label id="debit" isNormal>Expense</Ui.Form.Label>
        </Ui.Form.Field>
        <Ui.Form.Field isStacked={false}>
          <Ui.Form.Input
            id="credit"
            name="type"
            type="radio"
            required
            value="credit"
            defaultChecked={value === 'credit'}
            onChange={onChange}
          />
          <Ui.Form.Label id="credit" isNormal>Income</Ui.Form.Label>
        </Ui.Form.Field>
      </Ui.Form.Group>
    </Ui.Form.Field>
  );
};

const styles = tw({
  container: `
    sm:!w-44
  `,
});
