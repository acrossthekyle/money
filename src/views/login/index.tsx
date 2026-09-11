'use client';

import { useActionState, useState } from 'react';

import { login } from '@/actions/auth/login';
import tw from '@/styles';
import type { LoginFormState } from '@/types';
import Ui from '@/ui';

type Props = {
  data: {
    alert: string;
  };
};

export default function View({ data }: Props) {
  const [alert] = useState(data.alert);

  const [state, action, isPending] = useActionState(login, {
    data: {
      username: '',
    },
    error: null,
  } as LoginFormState);

  console.log('state: ', state);

  return (
    <main className={styles.container}>
      <form className={styles.form} action={action}>
        <Ui.Alerts.Banner isFromCookie value={alert} />
        {state?.error !== null && (
          <Ui.Alerts.Banner isPositive={false} value={state?.error} />
        )}
        <h2 className={styles.header}>Login</h2>
        <input
          className={styles.input}
          name="username"
          type="text"
          placeholder="Username"
          defaultValue={state?.data?.username}
          required
          disabled={isPending}
        />
        <input
          className={styles.input}
          name="password"
          type="password"
          placeholder="Password"
          required
          disabled={isPending}
        />
        <button
          className={styles.submit(isPending)}
          type="submit"
          disabled={isPending}
        >
          {isPending ? 'Verifying...' : 'Sign In'}
        </button>
      </form>
    </main>
  );
};

const styles = tw({
  container: `
    flex items-center justify-center
    h-[calc(100svh-3rem)]
  `,
  form: `
    flex flex-col gap-4
    w-full max-w-xs
    bg-(--foreground)/5.5
    border border-current/7.5
    p-4
    rounded-lg
  `,
  header: `
    font-black
    text-xs
    uppercase
  `,
  input: `
    border border-current/12.5
    bg-(--background)
    rounded-lg
    p-2
    text-base

    md:text-sm
  `,
  submit: (isProcessing: boolean) => tw(`
    py-3.5
    bg-(--foreground)
    rounded-full
    text-xs text-(--background)
    uppercase
    tracking-wide
    ${isProcessing ? 'cursor-not-allowed' : 'cursor-pointer'}

    motion-safe:duration-300

    hover:bg-(--foreground)/12.5

    md:py-2
  `),
});
