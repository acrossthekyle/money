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
    peer
    appearance-none
    relative
    border border-current/22.5
    rounded-md
    pb-2.25 pt-2.75 px-3
    text-(--foreground)
    bg-(--background)
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
