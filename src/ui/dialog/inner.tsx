import tw from '@/styles';

type Props = {
  isActive: boolean;
};

export default function Inner({ children, isActive }: React.PropsWithChildren<Props>) {
  return (
    <div className={styles.container(isActive)}>
      {children}
    </div>
  );
}

const styles = {
  container: (isActive: boolean) => tw(`
    absolute left-1/2
    -translate-x-1/2
    w-full max-w-xl
    overflow-y-scroll
    scroll-smooth
    bg-(--background)
    border border-current/12.5
    rounded-md

    motion-safe:duration-300
    ${isActive
      ? `bottom-4 scale-100 opacity-100`
      : `-bottom-30 scale-90 opacity-0`}
  `),
};
