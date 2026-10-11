'use client';

import { ArrowUpRight, LoaderCircle, Zap } from 'lucide-react';
import Link from 'next/link';

import { Main } from '@/layout';
import tw, { cs } from '@/styles';
import Ui from '@/ui';

import { useModel } from './model';

type Props = {
  data: {
    alert: string;
  };
};

export default function View({ data }: Props) {
  const {
    action,
    alert,
    error,
    formData,
    isPending,
    zone,
  } = useModel(data.alert);

  return (
    <>
      <Main className={styles.container}>
        <h1 className={styles.header}>
          <Ui.Components.Logo />
        </h1>
        <p className={styles.paragraph}>
          Sign in and starting planning.
        </p>
        <Ui.Alerts.Banner isFromCookie value={alert} />
        {error !== null && (
          <Ui.Alerts.Banner isPositive={false} value={error} />
        )}
        <form action={action} className={styles.form} id="login-form">
          <input
            className="hidden"
            name="timezone"
            readOnly
            type="text"
            value={zone}
          />
          <Ui.Form.Field className={styles.field}>
            <Ui.Form.Input
              id="username"
              name="username"
              type="text"
              placeholder=" "
              defaultValue={formData?.username}
              required
              disabled={isPending}
            />
            <Ui.Form.Label htmlFor="username" isRequired>
              Email
            </Ui.Form.Label>
          </Ui.Form.Field>
          <Ui.Form.Field className={styles.field}>
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
          <button
            className={styles.action}
            disabled={isPending}
            type="submit"
          >
            {isPending ? 'Processing...' : 'Sign In'}
          </button>
        </form>
      </Main>
      <footer className={styles.footer}>
        <Link
          className={styles.link}
          href="https://acrossthekyle.com"
          target="_blank"
        >
          <span>About the Developer</span>
          <ArrowUpRight className={styles.icon} />
        </Link>
      </footer>
    </>
  );
};

const styles = tw({
  container: `
    !absolute top-1/2 left-1/2
    -translate-y-1/2 -translate-x-1/2
    !pb-4

    before:absolute
    before:inset-y-0
    before:inset-x-3
    before:-z-1
    before:bg-(--foreground)/2
    before:border
    before:border-current/6
    before:rounded-xl

    md:before:inset-x-6
    md:px-9
  `,
  header: `
    mb-4
    text-center

    md:mt-3
  `,
  paragraph: `
    text-center
    text-sm
  `,
  form: `
    relative
    flex flex-col justify-center gap-5
    px-3

    md:px-0
  `,
  action: `
    flex items-center justify-center
    w-full
    h-10
    bg-lime-300
    text-black text-sm
    rounded-md
  `,
  footer: `
    absolute bottom-6 left-1/2
    -translate-x-1/2
  `,
  link: `
    flex items-center gap-1.25
    text-xs
    uppercase
    tracking-wide

    md:text-tiny
  `,
  icon: `
    w-3 h-3
    stroke-2
  `,
});
