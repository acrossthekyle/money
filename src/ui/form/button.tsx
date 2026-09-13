import tw from '@/styles';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isContinue?: boolean;
  isDestructive?: boolean;
  isSoft?: boolean;
};

export default function Button({
  children,
  isContinue,
  isDestructive,
  isSoft,
  type,
  ...props
}: React.PropsWithChildren<Props>) {
  return (
    <button
      {...props}
      className={[
        styles.container,
        type === 'submit' && styles.submit,
        isContinue && styles.submit,
        isDestructive && styles.destructive,
        isSoft && styles.soft,
      ].filter(Boolean).join(' ')}
      type={type || 'button'}
    >
      {children}
    </button>
  );
}

const styles = tw({
  container: `
    flex items-center justify-between gap-2
    px-3 py-2
    bg-(--background)
    rounded-full
    text-tiny
    font-medium dark:font-normal
    uppercase
    border border-current/22.5

    motion-safe:duration-300

    hover:border-current/62.5

    disabled:opacity-50
    disabled:pointer-events-none

    md:py-1
  `,
  submit: `
    bg-(--foreground)
    text-(--background)

    hover:bg-(--background)
    hover:border-(--foreground)
    hover:text-(--foreground)
  `,
  destructive: `
    bg-red-200 dark:bg-red-300
    text-red-900 dark:text-red-900
    border-red-900/22.5
  `,
  soft: `
    bg-mauve-700
    border-mauve-800/22.5
  `,
});
