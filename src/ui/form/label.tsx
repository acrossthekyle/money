import tw from '@/styles';

export default function Label({
  children,
  htmlFor,
}: React.PropsWithChildren< React.LabelHTMLAttributes<HTMLLabelElement>>) {
  return (
    <label className={styles.label} htmlFor={htmlFor}>{children}</label>
  );
};

const styles = tw({
  label: `
    mb-2

    sm:text-sm
  `,
});
