import tw from '@/styles';

type Props = {
  className?: string;
  isActive: boolean;
};

export default function Inner({
  children,
  className = '',
  isActive,
}: React.PropsWithChildren<Props>) {
  return (
    <div className={`${styles.container(isActive)} ${className}`.trim()}>
      {children}
    </div>
  );
}

const styles = {
  container: (isActive: boolean) => tw(`
    relative
    w-full max-w-90
    py-4 px-3

    motion-safe:duration-300

    ${isActive
      ? `opacity-100 translate-y-0`
      : `opacity-0 -translate-y-full`}

    md:mt-4
  `),
};
