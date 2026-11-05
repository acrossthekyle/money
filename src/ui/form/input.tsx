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
    <>
      <input
        className={
          cs(
            styles.container,
            className,
            type === 'date' && styles.date,
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
    </>
  );
};

const styles = tw({
  container: `
    appearance-none
    relative
    w-full
    text-xl
    outline-none
  `,
  date: `
    cursor-pointer
  `,
  mask: `
    absolute inset-0 z-1
    bg-(--background)
    text-xl
    pointer-events-none
  `,
  placeholder: `
    text-current/50
  `,
});
