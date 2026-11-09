import tw from '@/styles';

export default function Actions({ children }: React.PropsWithChildren) {
  return (
    <nav className={styles.container}>
      {children}
    </nav>
  );
};

const styles = tw({
  container: `
    fixed bottom-6 left-6 right-6
    flex flex-col gap-3
  `,
});
