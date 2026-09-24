import tw from '@/styles';

export default function Divider() {
  return (
    <span className={styles.container} role="presentation" />
  );
};

const styles = tw({
  container: `
    h-px w-4
    my-4
    bg-(--foreground)/75
  `,
});
