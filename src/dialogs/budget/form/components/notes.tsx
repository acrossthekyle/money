import tw from '@/styles';
import Ui from '@/ui';

type Props = {
  value?: string;
};

export default function Notes({ value }: Props) {
  return (
    <Ui.Form.Field className={styles.container}>
      <Ui.Form.Input
        placeholder=""
        id="notes"
        name="notes"
        type="text"
        defaultValue={value}
        maxLength={64}
      />
      <Ui.Form.Label htmlFor="notes">Memo</Ui.Form.Label>
    </Ui.Form.Field>
  );
};

const styles = tw({
  container: `
    col-span-24
  `,
});
