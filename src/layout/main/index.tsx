import tw from '@/styles';

export default function Main({ children }: React.PropsWithChildren) {
  return (
    <main className={styles.container}>
      {children}
    </main>
  );
};

const styles = tw({
  container: `
    mx-auto
    w-full

    xs:max-w-104
  `,
});
