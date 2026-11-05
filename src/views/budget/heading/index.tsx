import tw from '@/styles';

type Props = {
  isEditing: boolean;
  step: number;
  total: number;
};

export default function Heading({ isEditing, step, total }: Props) {
  return (
    <h1 className={styles.container}>
      <span className={styles.eyebrow}>
        {isEditing ? 'Edit' : 'Add'}
      </span>
      <span className={styles.title}>Step {step + 1}</span>
      <span className={styles.lid}>of {total}</span>
    </h1>
  );
};

const styles = tw({
  container: `
    flex flex-col items-end gap-1
  `,
  eyebrow: `
    font-bold
    text-lg
    leading-[0.9]
    uppercase
  `,
  title: `
    text-6xl
    font-semibold
    leading-[1.25]
  `,
  lid: `
    font-bold
    text-2xl
  `,
})
