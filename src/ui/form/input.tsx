import { format, parseISO } from 'date-fns';

import { DATE_INPUT } from '@/constants';
import tw from '@/styles';

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
          [
            styles.container,
            className,
            type === 'date' && styles.date,
          ].filter(Boolean).join(' ')
        }
        type={type}
        value={value}
        {...rest}
      />
      {type === 'date' && (
        <span aria-hidden="true" className={styles.mask} role="presentation">
          {!!value ? format(parseISO(String(value)), DATE_INPUT) : '...'}
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
    text-center
    outline-none
    border-b border-current/22.5
    py-2.25 px-4
    capitalize
  `,
  date: `
    h-11.5
    cursor-pointer
  `,
  mask: `
    absolute top-3 bottom-2 left-3.25 right-2 z-1
    pt-0.25
    bg-(--background)
    pointer-events-none
  `,
});
