import tw from '@/styles';

export default function Legend({ children }: React.PropsWithChildren) {
  return (
    <legend className={styles.container}>{children}</legend>
  );
};

const styles = tw({
  container: `
    mb-2
    text-sm
  `,
});
