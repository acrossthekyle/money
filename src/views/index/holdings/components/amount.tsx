import tw from '@/styles';

export default function Amount({ children }: React.PropsWithChildren) {
  return (
    <p className={styles.container}>
      ${children}
    </p>
  );
};

const styles = tw({
  container: `
    text-base
  `,
});
