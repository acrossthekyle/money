import tw from '@/styles';

type Props = {
  label?: string;
};

export default function Content({ children, label }: React.PropsWithChildren<Props>) {
  return (
    <section aria-label={label} className={styles.container}>
      {children}
    </section>
  );
};

const styles = tw({
  container: `
    flex flex-col gap-4
    mt-4
    px-4 pb-4
  `,
});
