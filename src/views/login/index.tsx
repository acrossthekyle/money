'use client';

import { ArrowUpRight, Stone } from 'lucide-react';
import Link from 'next/link';

import tw from '@/styles';
import Ui from '@/ui';

import { useModel } from './model';

type Props = {
  isDemo: boolean;
};

export default function View({ isDemo }: Props) {
  const {
    action,
    data,
    handleOnPassword,
    handleOnUsername,
    isBlocked,
    isPending,
  } = useModel();

  return (
    <>
      <main className={styles.container}>
        <h1 className={styles.header}>
          <Stone className={styles.stone} />
          Basalt {isDemo && '[demo]'}
        </h1>
        <div className={styles.inner}>
          <Ui.Components.Card.Container>
            <h2 className={styles.heading}>
              <span className={styles.title}>Account Access</span>
              <span className={styles.info}>
                Enter your credentials below
              </span>
            </h2>
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
              <Ui.Components.Button
                isDisabled={isBlocked || isPending}
                isPrimary
                isSquared
              >
                {isPending ? 'Processing...' : 'Login'}
              </Ui.Components.Button>
              <p className={styles.paragraph}>
                Want to see how it works? <Link
                  className={styles.demo}
                  href="https://project-basalt.demos.acrossthekyle.com"
                  target="_blank"
                >
                  View demo <ArrowUpRight className={styles.arrow} />
                </Link>
              </p>
              <p className={styles.links}>
                <Link
                  className={styles.link}
                  href="/policies/privacy"
                >
                  Privacy Policy
                </Link>
                <Link
                  className={styles.link}
                  href="https://acrossthekyle.com"
                >
                  About the developer
                </Link>
              </p>
            </form>
          </Ui.Components.Card.Container>
        </div>
      </main>
    </>
  );
};

const styles = tw({
  container: `
    absolute top-1/2 left-1/2
    -translate-y-1/2 -translate-x-1/2
    w-full

    xs:max-w-90
    xs:px-4
  `,
  inner: `
    p-4

    xs:px-0
  `,
  header: `
    flex items-center justify-center gap-2
    mb-2
    font-semibold
  `,
  stone: `
    size-4.5
  `,
  paragraph: `
    text-center text-current/62.5

    sm:text-sm
  `,
  heading: `
    flex flex-col gap-1
    text-center

    sm:text-sm
  `,
  title: `
    font-semibold
  `,
  info: `
    text-current/62.5
  `,
  form: `
    flex flex-col gap-5
  `,
  demo: `
    inline-flex items-center gap-0.5
    underline
    underline-offset-4
  `,
  links: `
    flex justify-center gap-6
  `,
  link: `
    text-current/82.5 text-center

    sm:text-sm
  `,
  arrow: `
    size-4
    stroke-2

    sm:size-3.5
  `,
});
