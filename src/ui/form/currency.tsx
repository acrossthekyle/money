'use client';

import { Minus, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';

import Input from 'react-currency-input-field';

import tw from '@/styles';

type Props = {
  onChange: (value: string) => void;
  value: string;
};

export default function Currency({ onChange, value }: Props) {
  const [isNegative, setIsNegative] = useState(Number(value) < 0);

  useEffect(() => {
    const cleaned = (value || '').replace('-', '');

    onChange(isNegative ? `-${cleaned}` : cleaned);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNegative]);

  const handleOnToggle = () => {
    setIsNegative(previous => !previous);
  };

  const handleOnChange = (value?: string) => {
    onChange(`${isNegative ? '-' : ''}${value || ''}`);
  };

  return (
    <div className={styles.container}>
      <button className={styles.toggle} onClick={handleOnToggle} type="button">
        {isNegative ? (
          <Minus className={styles.icon} />
        ) : (
          <Plus className={styles.icon} />
        )}
      </button>
      <span className={styles.prefix}>$</span>
      <Input
        allowNegativeValue={false}
        className={styles.input}
        id="currency"
        name="currency"
        placeholder="0.00"
        decimalsLimit={2}
        decimalScale={2}
        inputMode="decimal"
        onValueChange={handleOnChange}
        value={value.replace(/-/g, '')}
      />
    </div>
  );
};

const styles = tw({
  container: `
    relative
  `,
  input: `
    appearance-none
    relative
    w-full
    py-1.5 pl-12.5 pr-3
    bg-(--foreground)/5.5
    border border-(--foreground)/10.5
    outline-3 outline-transparent
    rounded-lg

    motion-safe:duration-300

    focus:border-(--foreground)/62.5
    focus:outline-(--foreground)/32.5

    lg:text-sm
  `,
  toggle: `
    absolute top-1/2 left-1 z-10
    -translate-y-1/2
    flex items-center justify-center
    w-8 h-8
  `,
  icon: `
    size-4.5

    sm:size-4
  `,
  prefix: `
    absolute top-1/2 left-9.5 z-10
    -translate-y-1/2

    lg:text-sm
  `,
});
