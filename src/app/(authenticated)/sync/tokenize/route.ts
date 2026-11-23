import { NextResponse } from 'next/server';
import { CountryCode, Products } from 'plaid/legacy';

import { client } from '../client';

export async function POST() {
  try {
    const response = await client.linkTokenCreate({
      user: {
        client_user_id: process.env.APP_USER_HSID || 'basalt-user',
      },
      client_name: 'Basalt',
      products: [Products.Transactions],
      country_codes: [CountryCode.Us],
      language: 'en',
    });

    return NextResponse.json({
      token: response.data.link_token,
    });
  } catch {
    return NextResponse.json({}, {
      status: 500,
    });
  };
};
