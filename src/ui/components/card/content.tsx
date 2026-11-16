import tw, { cs } from '@/styles';

type Props = {
  hasSpacing?: boolean;
  isPadded?: boolean;
};

export default function Content({
  children,
  hasSpacing,
  isPadded = true,
}: React.PropsWithChildren<Props>) {
  return (
    <div
      className={
        cs(
          styles.container,
          hasSpacing && styles.spacing,
          isPadded && styles.padded,
        )
      }
    >
      {children}
    </div>
  );
};

const styles = tw({
  container: `
    w-full
    rounded-xl
    bg-neutral-200/62.5
    overflow-hidden

    dark:bg-neutral-800/62.5
  `,
  spacing: `
    mt-4
  `,
  padded: `
    p-4
  `,
});
