import type { Record } from '@/types';

export async function read(table: string, id?: string): Promise<Record[]> {
  let results = undefined;

  try {
    results = await import(`@/storage/seed/${table}.js`);
  } catch {
    // do nothing
  }

  results = ((results?.default || results) || []);

  return id !== undefined
    ? results.filter((result: Record) => result.id === id)
    : [...results];
};

// eslint-disable-next-line unused-imports/no-unused-vars
export async function write(table: string, data: Record[]) {
  // do nothing
};
