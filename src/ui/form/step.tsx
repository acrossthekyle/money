import tw, { cs } from '@/styles';

type Props = {
  className?: string;
};

export default function Step({
  children,
  className,
}: React.PropsWithChildren<Props>) {
  return (
    <li className={cs(styles.container, className)}>
      {children}
    </li>
  );
};

const styles = tw({
  container: `
    shrink-0
    h-1
    w-8
    rounded-full
    bg-(--foreground)
  `,
});
