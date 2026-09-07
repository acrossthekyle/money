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
    flex flex-row gap-2
  `,
});
