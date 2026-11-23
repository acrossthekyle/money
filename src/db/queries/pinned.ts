import { tables } from '../tables';

type Return = {
  holding: string | null;
};

export async function get(): Promise<Return> {
  const { holdings } = await tables.holdings();
  const { pinned } = await tables.settings();

  if (holdings.length === 0) {
    return {
      holding: null,
    };
  }

  const holding = holdings.find(({ id }) => id === pinned);

  return {
    holding: (holding || holdings[0]).id,
  };
}
