import tw from '@/styles';

export default function Content({ children }: React.PropsWithChildren) {
  return (
    <div className={styles.container}>
      {children}
    </div>
  );
};

const styles = tw({
  container: `
    relative
    p-4
  `,
});
