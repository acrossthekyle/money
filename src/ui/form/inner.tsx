import tw from '@/styles';

type Props = {
  className?: string;
};

export default function Inner({
  children,
  className = '',
}: React.PropsWithChildren<Props>) {
  return (
    <div className={[styles.container, className].filter(Boolean).join(' ')}>
      {children}
    </div>
  );
};

const styles = tw({
  container: `
    grid grid-cols-24 xs:gap-x-4 gap-y-6
    p-4 pt-1
  `,
});
