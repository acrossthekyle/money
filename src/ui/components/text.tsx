import tw, { cs } from '@/styles';

type Props = {
  className?: string;
  left?: boolean;
  right?: boolean;
};

export default function Text({
  children,
  className = '',
  left,
  right,
}: React.PropsWithChildren<Props>) {
  return (
    <span
      className={
        cs(
          className,
          left && styles.left,
          right && styles.right
        )
      }
    >
      {children}
    </span>
  );
};

const styles = tw({
  left: `
    pl-0.75
  `,
  right: `
    pr-0.75
  `,
});
