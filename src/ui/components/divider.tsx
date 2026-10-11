import tw from '@/styles';

export default function Divider() {
  return (
    <span className={styles.container} role="presentation" />
  );
};

const styles = tw({
  container: `
    h-px w-4
    mt-4 mb-3
    bg-(--foreground)/75
  `,
});
