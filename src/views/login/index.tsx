'use client';

import { ArrowUpRight, Stone } from 'lucide-react';
import Link from 'next/link';

import tw from '@/styles';
import Ui from '@/ui';

import { useModel } from './model';

export default function View() {
  const {
    action,
    data,
    handleOnPassword,
    handleOnUsername,
    isPending,
  } = useModel();

  return (
    <>
      <main className={styles.container}>
        <h1 className={styles.header}>
          <Stone className={styles.stone} />
          BASALT
        </h1>
        <p className={styles.paragraph}>
          Sign in. Start planning.
        </p>
        <form action={action} className={styles.form}>
          <Ui.Form.Field>
            <Ui.Form.Label htmlFor="username">Username</Ui.Form.Label>
            <Ui.Form.Input
              id="username"
              name="username"
              placeholder=""
              type="text"
              defaultValue={data.username}
              required
              disabled={isPending}
              onChange={handleOnUsername}
            />
          </Ui.Form.Field>
          <Ui.Form.Field>
            <Ui.Form.Label htmlFor="password">Password</Ui.Form.Label>
            <Ui.Form.Input
              id="password"
              name="password"
              type="password"
              placeholder=""
              required
              disabled={isPending}
              onChange={handleOnPassword}
            />
          </Ui.Form.Field>
          <Ui.Components.Button isPrimary isDisabled={isPending}>
            {isPending ? 'Processing...' : 'Sign In'}
          </Ui.Components.Button>
        </form>
      </main>
      <footer className={styles.footer}>
        <Link className={styles.link} href="https://acrossthekyle.com" target="_blank">
          <span>About the developer</span>
          <ArrowUpRight className={styles.arrow} />
        </Link>
      </footer>
    </>
  );
};

const styles = tw({
  container: `
    absolute top-1/2 left-1/2
    -translate-y-1/2 -translate-x-1/2
    w-full max-w-xs
    p-4
    bg-zinc-50
    rounded-3xl
    border border-current/7.5

    dark:bg-neutral-900
  `,
  header: `
    flex flex-col items-center
    mb-2
    font-bold
  `,
  stone: `
    mb-2
  `,
  paragraph: `
    pb-6
    text-center

    sm:text-sm
  `,
  form: `
    flex flex-col gap-4
  `,
  footer: `
    fixed bottom-4
    w-full
  `,
  link: `
    flex justify-center items-center gap-2
    text-xs
    uppercase

    sm:text-tiny
  `,
  arrow: `
    size-4
    stroke-2

    sm:size-3.5
  `,
});
