import tw from '@/styles';

type Props = {
  isEditing: boolean;
};

export default function Heading({ isEditing }: Props) {
  return (
    <h2 className={styles.container} id="dialog-header">
      <span>
        {isEditing ? 'Edit' : 'Add'} transaction
      </span>
      <span className={styles.lid}>
        <span>Multi-step form</span>
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
    text-current/62.5

    sm:text-sm
  `,
})
