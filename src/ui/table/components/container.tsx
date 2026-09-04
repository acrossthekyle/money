import tw from '@/styles';

export default function Container({ children }: React.PropsWithChildren) {
  return (
    <div className={styles.container}>
      {children}
    </div>
  );
};

const styles = tw({
  container: `
    grid grid-cols-4
    w-full
  `,
});
