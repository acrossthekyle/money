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
    w-full max-w-xl
    h-auto
    mt-auto
    bg-(--background)
    border border-current/12.5
    rounded-lg

    motion-safe:duration-300
    transition-all
    ${isActive
      ? `scale-100 opacity-100 translate-y-0`
      : `scale-90 opacity-0 translate-y-8`}
  `),
};
