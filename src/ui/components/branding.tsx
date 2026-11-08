import tw from '@/styles';

export default function Branding() {
  return (
    <article className={styles.container}>
      <h2 className={styles.heading}>
        <span>Personal Financial</span>
        <span>Planning Tool</span>
        <span>Version 4.0.0</span>
      </h2>
      <div aria-label="logo" className={styles.logo}>
        <span>Bas</span>
        <span>Alt</span>
        <span className={styles.bar} role="presentation" />
      </div>
    </article>
  );
};

const styles = tw({
  container: `
    relative
    w-svw
    p-6

    sm:w-[calc(25rem-1px)]
  `,
  heading: `
    flex flex-col
    uppercase
    leading-3
    text-tiny
    font-semibold
  `,
  logo: `
    absolute bottom-6 right-6
    flex flex-col
    leading-[1]
    uppercase
    font-medium
    text-lg
  `,
  bar: `
    absolute right-full bottom-2.75
    w-7 h-0.5
    mr-3
    bg-(--foreground)
  `,
});
