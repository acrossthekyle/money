'use client';

import { useActionState, useEffect, useRef, useState } from 'react';

import { otp } from '@/actions/auth/otp';

export function useModel() {
  const [digits, setDigits] = useState<string[]>(['', '', '', '', '', '']);
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const form = useRef<HTMLFormElement | null>(null);
  const guard = useRef<string>('');

  const code = digits.join('');

  const otpable = otp.bind(null, {
    data: {
      otp: code,
    },
  });

  const [, action, isPending] = useActionState(otpable, null);

  useEffect(() => {
    if (code.length === 6 && !isPending && guard.current !== code) {
      guard.current = code;

      form.current?.requestSubmit();
    }

    if (code.length < 6) {
      guard.current = '';
    }
  }, [code, isPending]);

  const autoFill = (value: string, startAt: number = 0) => {
    const cleaned = value.replace(/\D/g, '');

    if (!cleaned) {
      return;
    }

    const offset = cleaned.length >= 6 ? 0 : startAt;

    const parts = cleaned.slice(0, 6 - offset).split('');

    setDigits((previous) => {
      const updated = [...previous];

      parts.forEach((character, index) => {
        updated[offset + index] = character;
      });

      return updated;
    });

    const next = Math.min(offset + parts.length, 5);

    refs.current[next]?.focus();
  };

  const handleOnChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const raw = event.target.value.trim();

    if (raw.length > 1) {
      autoFill(raw, index);

      return;
    }

    const digit = raw.replace(/\D/g, '');

    setDigits((previous) => {
      const next = [...previous];
      next[index] = digit;

      return next;
    });

    if (digit && index < 5) {
      refs.current[index + 1]?.focus();
    }
  };

  const handleOnKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (event.key === 'Backspace' && !digits[index] && index > 0) {
      refs.current[index - 1]?.focus();
    }
  };

  const handleOnPaste = (
    event: React.ClipboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    event.preventDefault();

    autoFill(event.clipboardData.getData('text'), index);
  };

  return {
    action,
    digits,
    form,
    handleOnChange,
    handleOnKeyDown,
    handleOnPaste,
    isBlocked: code.length !== 6,
    isPending,
    refs,
  };
};
