import Ui from '@/ui';

type Props = {
  parent: string;
};

export default function Parent({ parent }: Props) {
  return (
    <Ui.Form.Input
      name="parent"
      type="text"
      value={parent}
      readOnly
      className="hidden"
    />
  );
};
