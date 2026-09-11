import { format, parseISO } from 'date-fns';

import { DATE_FORMAT } from '@/constants';
import tw from '@/styles';
import Ui from '@/ui';

type Props = {
  date: string;
  value?: string;
};

export default function Start({ date, value }: Props) {
  return (
    <Ui.Form.Field className={styles.container}>
      <Ui.Form.Label id="start">Start</Ui.Form.Label>
      <Ui.Form.Input
        id="start"
        name="start"
        type="date"
        required
        defaultValue={value || format(parseISO(date), DATE_FORMAT)}
      />
    </Ui.Form.Field>
  );
};

const styles = tw({
  container: `
    sm:!w-34
  `,
});
