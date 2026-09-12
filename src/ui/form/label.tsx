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
    absolute -top-2.5 left-2.25 right-auto
    text-xs text-current/62.5 dark:text-current/67.5
    font-normal
    bg-(--background)
    px-1.25
    truncate

    peer-focus:absolute
    peer-focus:-top-2.5
    peer-focus:right-auto
    peer-focus:translate-y-0
    peer-focus:text-xs
    peer-focus:text-orange-400
    peer-focus:dark:text-teal-600

    peer-placeholder-shown:top-1/2
    peer-placeholder-shown:right-2.25
    peer-placeholder-shown:-translate-y-1/2
    peer-placeholder-shown:text-current/75
    peer-placeholder-shown:text-sm
  `,
  required: `
    relative top-0.75
    pl-0.75
    text-rose-400
    text-sm
  `,
});
