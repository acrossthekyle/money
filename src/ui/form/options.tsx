import tw, { cs } from '@/styles';

type Props = {
  className?: string;
};

export default function Options({
  children,
  className,
}: React.PropsWithChildren<Props>) {
  return (
    <fieldset className={cs(styles.container, className)}>
      {children}
    </fieldset>
  );
};

const styles = tw({
  container: `
    relative
    flex flex-col gap-3
    mb-4
  `,
});
