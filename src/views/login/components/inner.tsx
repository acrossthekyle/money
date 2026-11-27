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
    p-4

    xs:px-0
  `,
});
