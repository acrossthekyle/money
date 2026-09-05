import { NextRequest, NextResponse } from 'next/server';

import { db } from '@/db';
import type { Budget } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id === null) {
      return NextResponse.json(
        { error: 'Budget not found' },
        { status: 404 },
      );
    }

    const result = await db.read('budgets', id) as Budget[];

    if (result.length === 0) {
      return NextResponse.json(
        { error: 'Budget not found' },
        { status: 404 },
      );
    }

    return NextResponse.json(result[0]);
  } catch {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
