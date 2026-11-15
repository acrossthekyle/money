import tw from '@/styles';

export default function Labels({
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
    flex items-center justify-between
    w-full
    pt-2
    text-sm
  `,
})
