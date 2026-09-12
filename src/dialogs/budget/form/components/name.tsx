import tw from '@/styles';
import Ui from '@/ui';

type Props = {
  value?: string;
};

export default function Name({ value }: Props) {
  return (
    <Ui.Form.Field className={styles.container}>
      <Ui.Form.Input
        id="title"
        name="name"
        type="text"
        required
        defaultValue={value}
        placeholder=" "
        maxLength={36}
      />
      <Ui.Form.Label htmlFor="title" isRequired>Name</Ui.Form.Label>
    </Ui.Form.Field>
  );
};

const styles = tw({
  container: `
    col-span-24

    sm:col-span-10
  `,
});
