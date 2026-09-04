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
    border-t border-current/12.5
    bg-(--foreground)/5
    p-4 mt-2
  `,
});
