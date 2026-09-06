import Ui from '@/ui';

type Props = {
  value?: string;
};

export default function Notes({ value }: Props) {
  return (
    <Ui.Form.Field>
      <Ui.Form.Label id="notes">
        Memo (Optional)
      </Ui.Form.Label>
      <Ui.Form.Input
        placeholder="Max length: 64 Characters"
        id="notes"
        name="notes"
        type="text"
        defaultValue={value}
        maxLength={64}
      />
    </Ui.Form.Field>
  );
};
