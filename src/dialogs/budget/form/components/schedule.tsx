import tw from '@/styles';
import Ui from '@/ui';

type Props = {
  value?: string;
};

export default function Schedule({ value }: Props) {
  return (
    <Ui.Form.Field className={styles.container}>
      <Ui.Form.Select
        id="schedule"
        name="schedule"
        required
        defaultValue={value}
      >
        <option value="once">Never</option>
        <option value="daily">Daily</option>
        <option value="bi-daily">Every other day</option>
        <option value="weekly">Weekly</option>
        <option value="bi-weekly">Every other week</option>
        <option value="monthly">Monthly</option>
        <option value="bi-monthly">Every other month</option>
        <option value="quarterly">Quarterly</option>
        <option value="bi-annually">Every six months</option>
        <option value="yearly">Yearly</option>
      </Ui.Form.Select>
      <Ui.Form.Label htmlFor="schedule" isRequired>Repeats</Ui.Form.Label>
    </Ui.Form.Field>
  );
};

const styles = tw({
  container: `
    col-span-24

    sm:col-span-10
  `,
});
