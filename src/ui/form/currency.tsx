import Input from 'react-currency-input-field';

import tw from '@/styles';

export default function Currency(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    // @ts-expect-error - props are ok
    <Input
      allowNegativeValue={false}
      className={styles.container}
      id="currency"
      name="currency"
      placeholder="$ 0.00"
      decimalsLimit={2}
      decimalScale={2}
      prefix="$ "
      inputMode="decimal"
      {...props}
    />
  );
};

const styles = tw({
  container: `
    appearance-none
    relative
    w-full
    py-1 px-3
    bg-(--foreground)/5.5
    border border-(--foreground)/10.5
    outline-3 outline-transparent
    rounded-md

    motion-safe:duration-300

    focus:border-(--foreground)/62.5
    focus:outline-(--foreground)/32.5
  `,
});
