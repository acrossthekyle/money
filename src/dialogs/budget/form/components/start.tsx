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
      <Ui.Form.Input
        id="start"
        name="start"
        type="date"
        required
        defaultValue={value || format(parseISO(date), DATE_FORMAT)}
      />
      <Ui.Form.Label htmlFor="start" isRequired>Start</Ui.Form.Label>
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
