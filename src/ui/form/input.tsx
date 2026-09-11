import tw from '@/styles';

type Props = React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({ className, ...props }: Props) {
  return (
    <input
      className={`${styles.container} ${className || ''}`.trim()}
      {...props}
    />
  );
};

const styles = tw({
  container: `
    border border-current/20.5
    rounded-md
    p-2 pl-3
    text-base

    md:text-sm
  `,
});
