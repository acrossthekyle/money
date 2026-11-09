import tw, { cs } from '@/styles';

type Props = {
  capitalize?: boolean;
};

export default function Text({
  capitalize,
  children,
}: React.PropsWithChildren<Props>) {
  return (
    <p className={cs(styles.container, capitalize && styles.capitalize)}>
      {children}
    </p>
  );
};

const styles = tw({
  container: `
    text-sm text-current/62.5
  `,
  capitalize: `
    capitalize
  `,
});
