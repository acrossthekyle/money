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
    pt-6
    mt-6
    border-t border-dashed border-current/62.5
  `,
});
