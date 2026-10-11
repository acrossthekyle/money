import type { Holding } from '@/types';
import tw from '@/styles';
import Ui from '@/ui';

type Props = {
  holding: string;
  holdings: Holding[];
  type: string;
  value?: string;
};

export default function Transferee({
  holding,
  holdings,
  type,
  value,
}: Props) {
  if (holdings.length === 0) {
    return null;
  }

  return (
    <Ui.Form.Field className={styles.container}>
      <Ui.Form.Select
        id="transferee"
        name="transferee"
        defaultValue={value}
      >
        <option value="">...</option>
        {holdings.map((item) => (
          <option
            disabled={item.id === holding}
            key={item.id}
            value={item.id}
          >
            {item.name}
          </option>
        ))}
      </Ui.Form.Select>
      <Ui.Form.Label htmlFor="transferee">
        {type === 'debit' && 'Transfer as income to'}
        {type === 'credit' && 'Transfer as expense from'}
      </Ui.Form.Label>
    </Ui.Form.Field>
  );
};

const styles = tw({
  container: `
    col-span-12
  `,
});
