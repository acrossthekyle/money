'use server';

import { db } from '@/db';
import type {
  HoldingEraseActionInput,
  HoldingEraseActionResponse,
} from '@/types';

export async function erase(
  state: HoldingEraseActionResponse | null,
  input: HoldingEraseActionInput,
): Promise<HoldingEraseActionResponse> {
  await db.erase('holdings', input.id);

  return {
    isSuccess: true,
  };
};
