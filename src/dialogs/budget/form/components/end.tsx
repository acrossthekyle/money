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
      <Ui.Form.Label id="end">End (optional)</Ui.Form.Label>
      <Ui.Form.Input
        id="end"
        name="end"
        type="date"
        min={format(new Date(), DATE_FORMAT)}
        defaultValue={value || ''}
      />
    </Ui.Form.Field>
  );
};

const styles = tw({
  container: `
    sm:!w-34
  `,
});
