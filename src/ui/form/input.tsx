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
    text-center text-xl
    outline-none
    border-b border-current/22.5
    py-2.25 px-4

    md:text-base
  `,
  date: `
    cursor-pointer
  `,
  mask: `
    absolute top-3 bottom-2 left-3.25 right-2 z-1
    pt-0.25
    bg-(--background)
    text-center text-xl
    pointer-events-none

    md:text-base
  `,
  placeholder: `
    text-current/50
  `,
});
