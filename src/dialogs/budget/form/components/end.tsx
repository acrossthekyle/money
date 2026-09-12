import { format } from 'date-fns';

import { DATE_FORMAT } from '@/constants';
import tw from '@/styles';
import Ui from '@/ui';

type Props = {
  value?: string;
};

export default function End({ value }: Props) {
  return (
    <Ui.Form.Field className={styles.container}>
      <Ui.Form.Input
        id="end"
        name="end"
        type="date"
        placeholder=" "
        min={format(new Date(), DATE_FORMAT)}
        defaultValue={value || ''}
      />
      <Ui.Form.Label htmlFor="end">End</Ui.Form.Label>
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
