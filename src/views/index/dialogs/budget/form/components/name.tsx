import Ui from '@/ui';

type Props = {
  value?: string;
};

export default function Name({ value }: Props) {
  return (
    <Ui.Form.Field>
      <Ui.Form.Label id="name">Name</Ui.Form.Label>
      <Ui.Form.Input
        id="name"
        name="name"
        type="text"
        required
        defaultValue={value}
        placeholder="Max length: 36 characters"
        maxLength={36}
      />
    </Ui.Form.Field>
  );
};
