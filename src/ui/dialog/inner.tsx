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
    relative bottom-6
    flex flex-col justify-between
    w-[calc(100%-2rem)]
    h-auto min-h-70
    mt-auto
    rounded-4xl
    shadow-lg/25 dark:shadow-lg/75
    bg-black
    text-white

    motion-safe:duration-300

    ${isActive
      ? `scale-100 opacity-100 translate-y-0`
      : `scale-80 opacity-0 translate-y-24`}

    sm:max-w-xs
      md:rounded-xl
  `),
});
