'use client';

import Input from 'react-currency-input-field';

import tw from '@/styles';

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  value?: string;
};

export default function Percent({
  id,
  value,
  ...rest
}: Props) {
  return (
    <Input
      allowNegativeValue={true}
      className={styles.container}
      id={id}
      name={id}
      placeholder="% 0.00"
      defaultValue={value}
      decimalsLimit={2}
      decimalScale={2}
      disableGroupSeparators
      fixedDecimalLength={2}
      maxLength={5}
      prefix="% "
      {...rest}
    />
  );
};

const styles = tw({
  container: `
    py-2.25
    border-b border-current/22.5
    outline-none
    w-20
    text-center
  `,
});
