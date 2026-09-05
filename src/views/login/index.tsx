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
    error: null,
    success: false,
  } as LoginFormState);

  return (
    <main className={styles.container}>
      <form className={styles.form} action={action}>
        <Ui.Alerts.Banner isFromCookie value={alert} />
        <h2 className={styles.header}>Login</h2>
        {state?.error && <p style={{ color: "red" }}>{state.error}</p>}
        <input
          className={styles.input}
          name="username"
          type="text"
          placeholder="Username"
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
    h-svh
  `,
  form: `
    flex flex-col gap-4
    w-full max-w-2xs
  `,
  header: `
    font-black
    text-xs
    uppercase
  `,
  input: `
    border border-current/22.5
    rounded-md
    p-2
    text-sm
  `,
  submit: (isProcessing: boolean) => tw(`
    p-2
    bg-(--foreground)/7.5
    rounded-md
    text-xs
    uppercase
    tracking-wide
    ${isProcessing ? 'cursor-not-allowed' : 'cursor-pointer'}

    motion-safe:duration-300

    hover:bg-(--foreground)/12.5
  `),
});
