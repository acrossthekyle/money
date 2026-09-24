'use client';

import { ArrowUpRight, ArrowRight, CircleQuestionMark, LoaderCircle } from 'lucide-react';
import Link from 'next/link';

import { Dialogs } from '@/dialogs';
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
      <main className={styles.container}>
        <Ui.Form.Container action={action} id="login-form">
          <Ui.Alerts.Banner isFromCookie value={alert} />
          {error !== null && (
            <Ui.Alerts.Banner isPositive={false} value={error} />
          )}
          <Ui.Form.Inner className={styles.content}>
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
              {isPending ? (
                <LoaderCircle className={cs(styles.icon, styles.spin)} />
              ) : (
                <ArrowRight className={styles.icon} />
              )}
            </Ui.Form.Button>
          </Ui.Form.Footer>
          <input
            className="hidden"
            name="timezone"
            readOnly
            type="text"
            value={zone}
          />
        </Ui.Form.Container>
      </main>
      <Dialogs.Info />
    </>
  );
};

const styles = tw({
  container: `
    relative
    flex items-center justify-center
    h-[calc(100svh-7.5rem)]
    w-full max-w-sm
    mx-auto
    px-2 pb-8
  `,
  content: `
    !gap-x-0
  `,
  field: `
    col-span-24
  `,
  link: `
    flex items-center gap-1
    text-xs
    font-extralight
    uppercase

    md:text-tiny
    md:font-normal
  `,
  icon: `
    w-3 h-3
    stroke-1
  `,
  spin: `
    animate-spin
  `,
});
