'use client';

import Input from 'react-currency-input-field';

import tw from '@/styles';

type Props = {
  id: string;
  value?: string;
};

export default function Percent({ id, value }: Props) {
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
    />
  );
};

const styles = tw({
  container: `
    peer
    border border-current/22.5
    rounded-md
    py-2.25 pt-2.75 pl-3
    text-(--foreground)
    bg-(--background)
  `,
});
