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
    antialiased
    bg-(--foreground)/2.5 dark:bg-(--background)/7.5
    text-(--foreground)
    scroll-smooth
    h-full

    selection:bg-yellow-300
    selection:text-black
  `,
});
