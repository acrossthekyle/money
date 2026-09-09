import fs from 'fs';
import path from 'path';

import type { Record } from '@/types';

const FILE_OUTPUT = path.join(process.cwd(), './src/cache');

async function fileDirectory(output: string) {
  try {
    await fs.readdirSync(output);
  } catch {
    await fs.mkdirSync(output);
  }
};

async function fileWrite(path: string, content: string) {
  fileDirectory(FILE_OUTPUT);

  await fs.writeFile(path, content, function (error) {
    if (error) {
      // console.log(error);
    }
  });
};

export async function read(table: string, id?: string): Promise<Record[]> {
  let results = undefined;

  try {
    results = await import(`@/cache/${table}.js`);
  } catch {
    // do nothing
  }

  results = ((results?.default || results) || []);

  return id !== undefined
    ? results.filter((result: Record) => result.id === id)
    : [...results];
};

export async function write(table: string, data: Record[]) {
  const path = `${FILE_OUTPUT}/${table}.js`;

  await fileWrite(path, `const data = ${JSON.stringify(data, null, 2)};\n\r\n\rexport default data;`);
};
