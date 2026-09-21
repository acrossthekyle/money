'use server';

import { updateTag } from 'next/cache';

export async function bust() {
  updateTag('calendar');
};
