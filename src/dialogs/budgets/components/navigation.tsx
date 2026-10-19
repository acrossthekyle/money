import tw from '@/styles';

export default function Navigation({ children }: React.PropsWithChildren) {
  return (
    <nav className={styles.container}>
      {children}
    </nav>
  );
};

const styles = tw({
  container: `
    flex flex-row justify-between gap-4
    w-full
  `,
});
