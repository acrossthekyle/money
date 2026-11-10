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
    fixed bottom-3 left-6 right-6
    flex flex-col gap-3

    sm:bottom-6
  `,
});
