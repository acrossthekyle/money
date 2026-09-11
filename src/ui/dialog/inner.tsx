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
    w-full max-w-lg
    h-auto
    mt-auto
    bg-(--background)
    border border-current/12.5
    rounded-lg

    motion-safe:duration-300

    transition-all
    ${isActive
      ? `scale-100 opacity-100 translate-y-0`
      : `scale-90 opacity-0 translate-y-16`}
  `),
};
