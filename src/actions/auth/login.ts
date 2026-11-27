'use server';

import { redirect } from 'next/navigation';
import { Resend } from 'resend';
import * as z from 'zod';

import { db } from '@/db';

import { generate, hash } from './utils';

const resend = new Resend(process.env.RESEND_KEY);

const Form = z.object({
  username: z.string(),
  password: z.string(),
  zone: z.string(),
});

export async function login(
  formData: {
    data: {
      username: string;
      password: string;
      zone: string;
    };
  },
): Promise<void> {
  const validated = Form.safeParse({
    username: formData.data.username,
    password: formData.data.password,
    zone: formData.data.zone,
  });

  if (!validated.success) {
    return;
  }

  if (
    validated.data.username.toLowerCase() !== process.env.APP_USERNAME ||
    validated.data.password !== process.env.APP_PASSWORD
  ) {
    return;
  }

  const otp = generate();

  await db.writeAll('settings', [
    {
      id: 'otp',
      value: hash(otp),
    },
    {
      id: 'otp_expires',
      value: new Date(Date.now() + 10 * 60 * 1000).toString(),
    },
  ]);

  const { error } = await resend.emails.send({
    from: process.env.RESEND_FROM!,
    to: [process.env.MFA_USERNAME!],
    subject: 'Basalt OTP Code',
    text: `The verification code is ${otp}. It expires in 10 minutes.`,
  });

  if (error) {
    redirect('/login');

    return;
  }

  redirect('/login/otp');
};
