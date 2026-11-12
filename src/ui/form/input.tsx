import { format, parseISO } from 'date-fns';

import { DATE_DISPLAY } from '@/constants';
import tw, { cs } from '@/styles';

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
};

export default function Input({
  className = '',
  type,
  value,
  ...rest
}: Props) {
  return (
    <div className={styles.container}>
      <input
        className={
          cs(
            styles.input,
            className,
            type === 'date' ? styles.date : styles.basic,
          )
        }
        type={type}
        value={value}
        {...rest}
      />
      {type === 'date' && (
        <span
          aria-hidden="true"
          className={cs(styles.mask, !value && styles.placeholder)}
          role="presentation"
        >
          {!!value ? format(parseISO(String(value)), DATE_DISPLAY) : 'Eg. September 1st, 2026'}
        </span>
      )}
    </div>
  );
};

const styles = tw({
  container: `
    relative
  `,
  input: `
    peer
    appearance-none
    w-full
    py-1 px-3
    bg-(--foreground)/5.5
    rounded-md
  `,
  basic: `
    border border-(--foreground)/10.5
    outline-3 outline-transparent

    motion-safe:duration-300

    focus:border-(--foreground)/62.5
    focus:outline-(--foreground)/32.5
  `,
  date: `
    outline-0
    cursor-pointer
    opacity-0
  `,
  mask: `
    absolute inset-0 z-1
    flex items-center
    px-3
    rounded-md
    pointer-events-none
    border border-(--foreground)/10.5
    outline-3 outline-transparent
    bg-(--foreground)/5.5

    motion-safe:duration-300

    peer-focus:border-(--foreground)/62.5
    peer-focus:outline-(--foreground)/32.5
  `,
  placeholder: `
    text-current/50
  `,
});
