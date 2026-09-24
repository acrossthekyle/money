import tw, { cs } from '@/styles';

type Props = {
  action: (data: FormData) => void;
  className?: string;
  id: string;
};

export default function Container({
  action,
  children,
  className = '',
  id,
}: React.PropsWithChildren<Props>) {
  return (
    <form action={action} className={cs(styles.container, className)} id={id}>
      {children}
    </form>
  );
};

const styles = tw({
  container: `
    w-full
    mt-5
  `,
});
