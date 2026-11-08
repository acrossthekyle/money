import tw from '@/styles';

export default function Content({
  children,
}: React.PropsWithChildren) {
  return (
    <footer className={styles.container}>
      {children}
    </footer>
  );
};

const styles = tw({
  container: `
    flex flex-col gap-3
    w-full
    mt-auto
  `,
});
