import tw from '@/styles';

export default function Paragraph({
  children,
}: React.PropsWithChildren) {
  return (
    <p className={styles.container}>
      {children}
    </p>
  );
};

const styles = tw({
  container: `
    mb-6
    text-sm text-current/62.5
  `,
});
