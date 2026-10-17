import tw from '@/styles';

export default function Container({ children }: React.PropsWithChildren) {
  return (
    <ul className={styles.container}>
      {children}
    </ul>
  );
};

const styles = tw({
  container: `
    flex flex-col gap-3.5
    w-full h-full max-h-104
    px-2

    md:gap-4
  `,
});
