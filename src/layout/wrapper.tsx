import tw, { cs } from '@/styles';

type Props = {
  className: string;
};

export default function Wrapper({
  children,
  className,
}: React.PropsWithChildren<Props>) {
  return (
    <html
      className={cs(className, styles.container)}
      lang="en-US"
      suppressHydrationWarning
    >
      {children}
    </html>
  );
};

const styles = tw({
  container: `
    h-full
  `,
});
