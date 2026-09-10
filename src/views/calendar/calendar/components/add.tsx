import tw from '@/styles';

type Props = {
  onClick: () => void;
};

export default function Add({ onClick }: Props) {
  return (
    <button
      className={styles.container}
      onClick={onClick}
      title="Add Budget"
      type="button"
    />
  );
};

const styles = tw({
  container: `
    absolute inset-0 z-0

    motion-safe:duration-300
  `,
});
