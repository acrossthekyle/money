'use client';

import { ArrowUpRight } from 'lucide-react';

import tw from '@/styles';
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
    <Ui.Form.Container action={action} className={styles.container} id="login-form">
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
        <Ui.Components.Action
          href="https://acrossthekyle.com"
          target="_blank"
        >
          About the Developer <ArrowUpRight className={styles.icon} />
        </Ui.Components.Action>
        <Ui.Components.Action
          disabled={isPending}
          type="submit"
        >
          {isPending ? 'Verifying...' : 'Sign In'}
        </Ui.Components.Action>
      </Ui.Form.Footer>
      <input
        className="hidden"
        name="timezone"
        readOnly
        type="text"
        value={zone}
      />
    </Ui.Form.Container>
  );
};

const styles = tw({
  container: `
    relative
    flex flex-col justify-center
    h-[calc(100svh-7.5rem)]
    w-full
    pb-8
  `,
  content: `
    !gap-x-0
  `,
  field: `
    col-span-12
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
