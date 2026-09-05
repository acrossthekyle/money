import tw from '@/styles';

type Props = {
  className?: string;
  isStacked?: boolean
};

export default function Field({ children, className, isStacked }: React.PropsWithChildren<Props>) {
  return (
    <div
      className={`${styles.container(isStacked)} ${className || ''}`.trim()}
    >
      {children}
    </div>
  );
};

const styles = tw({
  container: (isStacked?: boolean) => tw(`
    relative
    flex gap-2
    w-full
    ${isStacked ? 'flex-col pb-2' : 'flex-row items-center pt-3'}
  `),
});
