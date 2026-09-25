import tw, { cs } from '@/styles';

type Props = {
  className?: string;
  mode?: 'primary' | 'secondary';
};

export default function Icon({
  children,
  className = '',
  mode = 'primary',
}: React.PropsWithChildren<Props>) {
  return (
    <span
      className={
        cs(
          styles.container,
          className,
          mode === 'primary' && styles.primary,
          mode === 'secondary' && styles.secondary,
        )
      }
    >
      {children}
    </span>
  );
};

const styles = tw({
  container: `
    flex items-center justify-center
    w-4.5 h-4.5
    rounded-sm
  `,
  primary: `
    bg-(--background)
    text-(--foreground)
  `,
  secondary: `
    bg-(--foreground)
    text-(--background)

    motion-safe:duration-300

    group-hover:bg-(--background)
    group-hover:text-(--foreground)
  `,
});
