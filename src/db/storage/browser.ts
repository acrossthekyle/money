import type { Record } from '@/types';

const IS_READY = typeof window !== 'undefined';

function safeParse(data: string | null): Record[] {
  if (!data) {
    return [];
  }

  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
};

export async function read(table: string, id?: string): Promise<Record[]> {
  if (!IS_READY) {
    return [];
  }

  const data = localStorage.getItem(table);

  const results = safeParse(data);

  return id !== undefined
    ? results.filter(result => result.id === id)
    : results;
}

export async function write(table: string, data: Record[]): Promise<void> {
  if (!IS_READY) {
    return;
  }

  try {
    localStorage.setItem(table, JSON.stringify(data));

    return;
  } catch (error) {
    const isQuotaExceeded =
      error instanceof DOMException && (
        error.name === 'QuotaExceededError' ||
        error.name === 'NS_ERROR_DOM_QUOTA_REACHED'
      );

    if (isQuotaExceeded) {
      console.error(`Storage limit exceeded for table: ${table}`);
    } else {
      console.error('Failed to write to localStorage:', error);
    }

    return;
  }
}
