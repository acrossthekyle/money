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
    flex flex-col gap-3
    w-full
    mt-auto
  `,
});
