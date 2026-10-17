import tw from '@/styles';

type Props = {
  text: string;
};

export default function Title({
  children,
  text,
}: React.PropsWithChildren<Props>) {
  return (
    <h2 className={styles.container} id="dialog-header">
      <span className={styles.text}>
        {text}
      </span>
      {children}
    </h2>
  );
};

const styles = tw({
  container: `
    flex flex-col items-center gap-0.25
    mt-3
  `,
  text: `
    text-base
    uppercase
    font-bold

    md:text-xs
  `,
});
