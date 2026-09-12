'use client';

import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
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
      <div className={styles.inner}>
        <Ui.Form.Container action={action} id="login-form">
          <Ui.Alerts.Banner isFromCookie value={alert} />
          {state?.error !== null && (
            <Ui.Alerts.Banner isPositive={false} value={state?.error} />
          )}
          <Ui.Form.Inner className="!gap-x-0">
            <Ui.Form.Field className="col-span-24">
              <Ui.Form.Input
                id="username"
                name="username"
                type="text"
                placeholder=" "
                defaultValue={state?.data?.username}
                required
                disabled={isPending}
              />
              <Ui.Form.Label htmlFor="username" isRequired>
                Email
              </Ui.Form.Label>
            </Ui.Form.Field>
            <Ui.Form.Field className="col-span-24">
              <Ui.Form.Input
                id="password"
                name="password"
                type="password"
                placeholder=" "
                required
                disabled={isPending}
              />
              <Ui.Form.Label htmlFor="password" isRequired>
                Password
              </Ui.Form.Label>
            </Ui.Form.Field>
          </Ui.Form.Inner>
          <Ui.Form.Footer>
            <Link
              className={styles.link}
              href="https://acrossthekyle.com"
              target="_blank"
            >
              About the Developer <ArrowUpRight className={styles.icon} />
            </Link>
            <Ui.Form.Button
              type="submit"
              disabled={isPending}
            >
              {isPending ? 'Verifying...' : 'Sign In'}
            </Ui.Form.Button>
          </Ui.Form.Footer>
        </Ui.Form.Container>
      </div>
    </main>
  );
};

const styles = tw({
  container: `
    flex items-center justify-center
    h-[calc(100svh-4rem)]
  `,
  inner: `
    w-full
    mx-4

    sm:max-w-xs
  `,
  link: `
    flex items-center gap-1
    text-tiny
    font-light
    uppercase
  `,
  icon: `
    w-3 h-3
    stroke-1
  `,
});
