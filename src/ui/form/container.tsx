import tw, { cs } from '@/styles';

type Props = {
  isActive: boolean;
};

export default function Container({
  children,
  isActive,
}: React.PropsWithChildren<Props>) {
  return (
    <section className={cs(styles.section, isActive && styles.visible)}>
      {children}
    </section>
  );
};

const styles = tw({
  section: `
    relative
    flex-col
    h-[calc(100%-8.75rem)]
    pt-6 pb-2
    overflow-y-auto
    hidden

    after:fixed
    after:left-0
    after:right-0
    after:bottom-27
    after:z-100
    after:h-6
    after:bg-linear-to-t
    after:from-zinc-50
    dark:after:from-zinc-950
    after:to-transparent
    after:pointer-events-none

    sm:after:left-6
    sm:after:right-6
    sm:after:bottom-30
  `,
  visible: `
    !flex
  `,
});
