import tw, { cs } from '@/styles';

type Props = {
  isWarning?: boolean;
};

export default function Container({
  children,
  isWarning,
}: React.PropsWithChildren<Props>) {
  return (
    <div
      aria-atomic="true"
      className={
        cs(
          styles.container,
          isWarning && styles.warning,
        )
      }
      role="alert"
    >
      {children}
    </div>
  );
};

const styles = tw({
  container: `
    flex flex-col gap-1
    mt-1
    mb-4
    border
    rounded-lg
    p-3

    sm:text-sm
  `,
  warning: `
    bg-amber-800
    text-white
    border-amber-900

    dark:bg-amber-950
  `,
})
