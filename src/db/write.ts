import type { Record } from '@/types';

import { storage } from './storage';

export async function write(table: string, data: Record) {
  const system = await storage();

  const results = await system.read(table) as Record[];

  let found = -1;

  if (results.length) {
    found = results.findIndex(item => item.id === data.id);
  }

  if (found >= 0) {
    results[found] = data;
  } else {
    results.push(data);
  }

  await system.write(table, results);
};

export async function writeAll(table: string, data: Record[]) {
  const system = await storage();

  const results = await system.read(table) as Record[];

  for (const item of data) {
    let found = -1;

    if (results.length) {
      found = results.findIndex(result => result.id === item.id);
    }

    if (found >= 0) {
      results[found] = item;
    } else {
      results.push(item);
    }
  }

  await system.write(table, results);
};
