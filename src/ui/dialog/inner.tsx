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
    relative top-2
    w-full max-w-90
    p-4
    bg-(--foreground)
    text-(--background)
    rounded-xl

    motion-safe:duration-300

    ${isActive
      ? `opacity-100 translate-y-0`
      : `opacity-0 -translate-y-full`}

    md:mt-4
  `),
};
