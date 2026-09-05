import tw from '@/styles';

type Props = React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({ className, type, ...props }: Props) {
  if (type === 'text' || type === 'date') {
    return (
      <input
        className={`${styles.container} ${className || ''}`.trim()}
        {...props}
        type={type}
      />
    );
  }

  return (
    <input
      className={`${className || ''}`.trim()}
      {...props}
      type={type}
    />
  );
};

const styles = tw({
  container: `
    border border-current/20.5
    rounded-md
    p-2 pl-3
    text-sm
  `,
});
