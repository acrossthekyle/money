import tw, { cs } from '@/styles';

type Props = {
  className?: string;
  isActive?: boolean;
};

export default function Inner({
  children,
  className = '',
  isActive,
}: React.PropsWithChildren<Props>) {
  return (
    <div className={cs(styles.container(isActive), className)}>
      {children}
    </div>
  );
}

const styles = tw({
  container: (isActive: boolean) => tw(`
    relative
    flex flex-col justify-between
    w-full max-w-sm
    h-svh
    p-2

    motion-safe:duration-300

    ${isActive
      ? `opacity-100 translate-x-0`
      : `opacity-0 translate-x-24`}
  `),
});
