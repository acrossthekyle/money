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
    absolute left-1/2 bottom-2
    -translate-x-1/2
    flex-1
    w-full max-w-sm
    px-2

    md:bottom-auto
    md:top-1/2
    md:-translate-y-1/2
  `,
});
