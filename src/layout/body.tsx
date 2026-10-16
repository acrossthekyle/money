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
    bg-(--background)
    text-(--foreground)
    scroll-smooth
    font-geist

    selection:bg-yellow-300
    selection:text-black

    has-[dialog[open]]:opacity-10

    motion-safe:duration-200
    motion-safe:transition-opacity
  `,
});
