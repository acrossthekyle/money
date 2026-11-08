import tw from '@/styles';

type Props = {
  isEditing: boolean;
  step: number;
  total: number;
};

export default function Heading({ isEditing, step, total }: Props) {
  return (
    <h2 className={styles.container} id="dialog-header">
      <span>
        {isEditing ? 'Edit' : 'Add'} transaction
      </span>
      <span className={styles.lid}>
        <span>Step {step} of {total}</span>
      </span>
    </h2>
  );
};

const styles = tw({
  container: `
    flex flex-col
  `,
  lid: `
    flex justify-between
    text-sm text-current/62.5
  `,
})
