import { get as getSettings } from '@/getters/settings';
import type { Today } from '@/types';
import { dateable } from '@/utils';

export async function get() {
  const { zone } = await getSettings();

  return {
    date: dateable(zone) as Today,
  };
};
