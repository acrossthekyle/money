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
    flex flex-col gap-0.5
    mt-2
    px-4 pb-4
  `,
});
