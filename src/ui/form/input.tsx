import tw from '@/styles';

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
};

export default function Input({ className = '', type, ...rest }: Props) {
  return (
    <input
      className={
        [
          styles.container,
          className,
          type === 'date' && styles.date,
        ].filter(Boolean).join(' ')
      }
      type={type}
      {...rest}
    />
  );
};

const styles = tw({
  container: `
    peer
    appearance-none
    relative
    border border-current/12.5 dark:border-current/27.5
    rounded-sm
    outline-none
    pb-2.25 pt-2.75 px-3
    text-base
    bg-(--background)

    focus:border-orange-400
    focus:dark:border-teal-600
  `,
  date: `
    uppercase
    !pr-2
    text-sm
    h-11.5

    xxs:text-base
  `,
});
