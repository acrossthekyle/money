import { Forms } from '@/forms';
import tw from '@/styles';
import Ui from '@/ui';

export default function View() {
  return (
    <>
      <Ui.Components.Divider />
      <h1 className={styles.header}>
        <span className={styles.title}>
          Create Account/Asset
        </span>
      </h1>
      <Forms.Holding />
    </>
  );
};

const styles = tw({
  header: `
    flex flex-col gap-1
    text-sm
    uppercase
  `,
  title: `
    font-bold
  `,
  lid: `
    text-xs
  `,
});
