import tw, { cs } from '@/styles';

type Props = {
  className?: string;
};

export default function Steps({
  children,
  className,
}: React.PropsWithChildren<Props>) {
  return (
    <section aria-label="form steps" className={styles.container}>
      <ul className={cs(styles.steps, className)}>
        {children}
      </ul>
      <p className={styles.label}>Step 1 of 7</p>
    </section>
  );
};

const styles = tw({
  container: `
    flex flex-col justify-center gap-2
    w-full
  `,
  steps: `
    flex justify-center items-center gap-1
    w-full
    mt-2
  `,
  label: `
    text-xtiny
  `,
});
