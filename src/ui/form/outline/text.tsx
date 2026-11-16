import tw, { cs } from '@/styles';

type Props = {
  capitalize?: boolean;
};

export default function Text({
  capitalize,
  children,
}: React.PropsWithChildren<Props>) {
  return (
    <span className={cs(styles.container, capitalize && styles.capitalize)}>
      {children}
    </span>
  );
};

const styles = tw({
  container: `
    sm:text-sm
  `,
  capitalize: `
    capitalize
  `,
});
