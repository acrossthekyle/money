import tw from '@/styles';

export default function Body({ children }: React.PropsWithChildren) {
  return (
    <body className={styles.container}>
      {children}
    </body>
  );
};

const styles = tw({
  container: `
    relative
    flex flex-col min-h-svh
    w-full h-full
    antialiased
    bg-(--background)
    text-(--foreground)
    scroll-smooth
    font-geist
    overflow-x-hidden

    selection:bg-yellow-300
    selection:text-black

    sm:left-1/2
    sm:top-1/2
    sm:-translate-x-1/2
    sm:-translate-y-1/2
    sm:max-w-[22rem]
    sm:h-[88dvh]
    sm:min-h-auto
    sm:border
    sm:border-black
    sm:rounded-4xl
    sm:overflow-y-auto
    sm:pt-13
  `,
});
