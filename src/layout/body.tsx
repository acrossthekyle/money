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

    selection:bg-yellow-300
    selection:text-black

    motion-safe:duration-300

    has-[dialog[open]]:opacity-10
    has-[dialog[open]]:translate-y-108

    md:has-[dialog[open]]:translate-y-98
  `,
});
