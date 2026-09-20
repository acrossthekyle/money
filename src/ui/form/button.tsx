import tw, { cs } from '@/styles';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  children,
  type,
  ...props
}: React.PropsWithChildren<Props>) {
  return (
    <button
      {...props}
      className={cs(
        styles.container,
        type === 'submit' && styles.submit,
      )}
      type={type || 'button'}
    >
      {children}
    </button>
  );
}

const styles = tw({
  container: `
    flex items-center justify-center
    h-9 w-9
    bg-(--background)
    rounded-full
    text-xs
    font-medium dark:font-normal
    uppercase
    border border-current/22.5

    motion-safe:duration-300

    hover:border-current/62.5

    disabled:pointer-events-none

    md:text-tiny
  `,
  submit: `
    bg-(--foreground)
    text-(--background)

    hover:bg-(--background)
    hover:border-(--foreground)
    hover:text-(--foreground)
  `,
});
