import tw from '@/styles';

export default function Inner({ children }: React.PropsWithChildren) {
  return (
    <div className={styles.container}>
      {children}
    </div>
  );
};

const styles = tw({
  container: `
    flex flex-col gap-4
    px-4 py-2
  `,
});
