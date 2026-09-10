import tw from '@/styles';

type Props = {
  className?: string;
};

export default function Text({
  children,
  className = '',
}: React.PropsWithChildren<Props>) {
  return (
    <span className={`${styles.container} ${className}`.trim()}>
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
});
