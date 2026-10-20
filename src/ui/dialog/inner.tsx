import { CARD_RADIUS } from '@/constants';
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
    h-auto min-h-60 max-h-[calc(100svh-3.5rem)]
    mt-auto
    shadow-lg/50
    bg-(--background)
    text-(--foreground)
    overflow-y-auto
    border border-current/8

    motion-safe:duration-300

    ${isActive
      ? `scale-100 opacity-100 translate-y-0`
      : `scale-80 opacity-0 translate-y-24`}

    sm:max-w-xs

    ${CARD_RADIUS}
  `),
});
