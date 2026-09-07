import Ui from '@/ui';

type Props = {
  value?: string;
};

export default function Schedule({ value }: Props) {
  return (
    <Ui.Form.Field>
      <Ui.Form.Label id="schedule">Frequency</Ui.Form.Label>
      <Ui.Form.Select
        id="schedule"
        name="schedule"
        required
        defaultValue={value}
      >
        <option value="once">Once</option>
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
    </Ui.Form.Field>
  );
};
