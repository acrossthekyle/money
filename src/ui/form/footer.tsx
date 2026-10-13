import tw from '@/styles';

export default function Footer({ children }: React.PropsWithChildren) {
  return (
    <div className={styles.container}>
      {children}
    </div>
  );
};

const styles = tw({
  container: `
    flex flex-col gap-4 items-center justify-between
    w-full
    -mt-2
    p-4
    bg-(--foreground)/2.5
  `,
});
