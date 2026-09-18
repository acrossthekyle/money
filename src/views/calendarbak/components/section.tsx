import tw from '@/styles';

type Props = {
  className?: string;
};

export default function Section({
  children,
  className = '',
}: React.PropsWithChildren<Props>) {
  return (
    <div className={`${styles.container} ${className}`.trim()}>
      {children}
    </div>
  );
};

const styles = tw({
  container: `
    flex gap-2
  `,
});
