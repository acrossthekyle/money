import * as cloud from './cloud';
import * as file from './file';
import * as seed from './seed';

export async function storage() {
  if (process.env.DATABASE_ENGINE === 'file') {
    return file;
  }

  if (process.env.DATABASE_ENGINE === 'seed') {
    return seed;
  }

  return cloud;
};
