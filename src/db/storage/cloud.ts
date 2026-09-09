import { Redis } from '@upstash/redis';

import type { Record } from '@/types';

const redis = Redis.fromEnv();

export async function read(table: string, id?: string): Promise<Record[]> {
  let results: Record[] | null = null;

  try {
    results = await redis.get<Record[]>(`${process.env.DATABASE_PREFIX}_${table}`);
  } catch {
    // do nothing
  }

  const output = (results || []);

  return id !== undefined
    ? output.filter(result => result.id === id)
    : [...output];
};

export async function write(table: string, data: Record[]) {
  try {
    await redis.set(`${process.env.DATABASE_PREFIX}_${table}`, data);
  } catch {
    // do nothing
  }
};
