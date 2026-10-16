import tw from '@/styles';

export default function Content({ children }: React.PropsWithChildren) {
  return (
    <p className={styles.container}>
      {children}
    </p>
  );
};

const styles = tw({
  container: `
    flex flex-col items-center gap-0.5
    -mt-1
  `,
});
