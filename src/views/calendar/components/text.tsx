import tw from '@/styles';

type Props = {
  canDim?: boolean;
  className?: string;
};

export default function Text({
  canDim = false,
  children,
  className = '',
}: React.PropsWithChildren<Props>) {
  return (
    <span
      className={
        [
          styles.container,
          canDim && styles.dim,
          className,
        ].filter(Boolean).join(' ')
      }
    >
      {children}
    </span>
  );
};

const styles = tw({
  container: `
    block
    pl-1
    text-tiny
    whitespace-nowrap
    uppercase
    leading-[1]
    tracking-wide
  `,
  dim: `
    text-current/30
  `,
});
