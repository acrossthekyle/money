import tw from '@/styles';

export default function Scripting() {
  return (
    <noscript>
      <div aria-live="polite" className={styles.container}>
        <p className={styles.content}>
          <span className={styles.emphasis}>Warning: </span>
          JavaScript is disabled in your browser. This site will not work
          properly. Please enable JavaScript and then refresh this page. Thank
          you.
        </p>
      </div>
    </noscript>
  );
};

const styles = tw({
  container: `
    fixed inset-0 z-1000
    flex items-center justify-center
    bg-(--background)
  `,
  content: `
    w-full max-w-sm
    text-sm
  `,
  emphasis: `
    font-black
    uppercase
    text-xs
  `,
});
