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
    flex gap-4 items-center justify-between
    mt-4
    p-3
    border-t border-current/17.5
    bg-(--foreground)/2.5
  `,
});
