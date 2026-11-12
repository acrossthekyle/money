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
    relative left-1/2 z-0
    -translate-x-1/2
    flex-1
    flex flex-col
    w-full max-w-104
    p-2

    sm:py-6
  `,
});
