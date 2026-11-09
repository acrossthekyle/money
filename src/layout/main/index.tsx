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
    absolute top-1/2 left-1/2
    -translate-y-1/2 -translate-x-1/2
    flex-1
    w-full max-w-sm
    px-2
    -mt-6
  `,
});
