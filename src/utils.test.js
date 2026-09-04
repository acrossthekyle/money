import { pad } from './utils';

describe('utils', () => {
  describe('pad', () => {
    it('will pad numbers', () => {
      expect(pad(1)).toEqual('01');
      expect(pad(0)).toEqual('00');
      expect(pad(12)).toEqual('12');
      expect(pad(50, 3)).toEqual('050');
      expect(pad(1, 1)).toEqual('1');
    });
  });
});
