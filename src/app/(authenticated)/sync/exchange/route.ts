import { NextResponse } from 'next/server';

import { db } from '@/db';

import { client } from '../client';

export async function POST(request: Request) {
  try {
    if (!process.env.PLAID_ENABLED) {
      return NextResponse.json({}, {
        status: 401,
      });
    }

    const { token } = await request.json();

    const exchange = await client.itemPublicTokenExchange({
      public_token: token,
    });

    const { access_token } = exchange.data;

    await db.write('settings', {
      id: 'plaid',
      value: access_token,
    });

    return NextResponse.json({});
  } catch {
    return NextResponse.json({}, {
      status: 500,
    });
  };
};
