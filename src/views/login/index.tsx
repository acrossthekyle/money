'use client';

import { ArrowUpRight } from 'lucide-react';
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
      <div className={styles.container}>
        <h1 className={styles.header}>BASALT</h1>
        <p className={styles.paragraph}>
          Sign in and starting planning.
        </p>
        <form action={action} className={styles.form} id="login-form">
          <div className={styles.field}>
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
            <Ui.Form.Hint></Ui.Form.Hint>
          </div>
          <div className={styles.field}>
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
            <Ui.Form.Hint></Ui.Form.Hint>
          </div>
          <Ui.Components.Button isPrimary isDisabled={isPending}>
            {isPending ? 'Processing...' : 'Sign In'}
          </Ui.Components.Button>
        </form>
      </div>
      <footer className={styles.footer}>
        <Link className={styles.link} href="https://acrossthekyle.com" target="_blank">
          <span>About the developer</span>
          <ArrowUpRight className={styles.icon} />
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
  `,
  header: `
    mb-2
    font-bold
    text-center
  `,
  paragraph: `
    pb-6
    text-center

    sm:text-sm
  `,
  form: `
    flex flex-col gap-4
    mt-4
  `,
  field: `
    flex flex-col gap-1
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
  icon: `
    size-4
    stroke-2

    sm:size-3.5
  `,
});
