import * as cloud from './cloud';
import * as file from './file';

export async function storage() {
  if (process.env.DATABASE_ENGINE === 'file') {
    return file;
  }

  return cloud;
};
