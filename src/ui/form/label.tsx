import tw from '@/styles';

type Props = React.LabelHTMLAttributes<HTMLLabelElement> & {
  isRequired?: boolean;
};

export default function Label({
  children,
  isRequired,
  ...rest
}: React.PropsWithChildren<Props>) {
  return (
    <label className={styles.container} {...rest}>
      {children}
      <span className={styles.required} role="presentation">
        {isRequired ? '*' : ''}
      </span>
    </label>
  );
};

const styles = tw({
  container: `
    absolute top-1.5 left-2 right-auto
    text-xs text-white
    font-normal
    bg-black
    px-1.25
    truncate
  `,
  required: `
    relative top-0.75
    pl-0.75
    text-rose-400
    text-sm
  `,
});
