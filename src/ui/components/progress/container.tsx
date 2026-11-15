import tw from '@/styles';

export default function Container({
  children,
}: React.PropsWithChildren) {
  return (
    <div className={styles.container}>
      {children}
    </div>
  );
};

const styles = tw({
  container: `
    relative
    mt-4 mb-1
    w-full
  `,
})
