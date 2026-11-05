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
    flex-col items-start justify-end gap-4
    h-full
    pt-4
    hidden
  `,
  visible: `
    !flex
  `,
});
