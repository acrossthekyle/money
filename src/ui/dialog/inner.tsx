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
    relative bottom-4
    w-full
    h-auto
    mt-auto
    bg-(--background)
    border border-current/5.5 dark:border-current/17.5
    rounded-xl
    shadow-lg/25 dark:shadow-lg/75

    motion-safe:duration-300

    ${isActive
      ? `scale-100 opacity-100 translate-y-0`
      : `scale-80 opacity-0 translate-y-24`}

    sm:max-w-sm
  `),
});
