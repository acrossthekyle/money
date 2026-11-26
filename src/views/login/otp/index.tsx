'use client';

import { Stone } from 'lucide-react';
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
    handleOnCode,
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
                Enter the O.T.P. code below
              </span>
            </h2>
            <form action={action} className={styles.form}>
              <Ui.Form.Field>
                <Ui.Form.Input
                  id="code"
                  name="code"
                  placeholder=""
                  inputMode="decimal"
                  type="number"
                  defaultValue={data.otp}
                  required
                  disabled={isPending}
                  onChange={handleOnCode}
                />
              </Ui.Form.Field>
              <Ui.Components.Button
                isDisabled={isBlocked || isPending}
                isPrimary
                isSquared
              >
                {isPending ? 'Processing...' : 'Submit'}
              </Ui.Components.Button>
              <p className={styles.paragraph}>
                Back to <Link
                  className={styles.link}
                  href="/login"
                >
                  Login
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
  link: `
    inline-flex items-center gap-0.5
    text-current/82.5
    underline
    underline-offset-4

    sm:text-sm
  `,
});
