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
    relative

    sm:bg-black
    sm:h-screen
    sm:overflow-hidden

    sm:after:absolute
    sm:after:top-16
    sm:after:left-1/2
    sm:after:z-9999
    sm:after:-translate-x-1/2
    sm:after:bg-black
    sm:after:rounded-full
    sm:after:w-20
    sm:after:h-5
  `,
});
