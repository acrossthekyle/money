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
    grid grid-cols-12 sm:gap-x-6 gap-y-6
  `,
});
