import tw, { clean } from './styles';

describe('styles', () => {
  describe('clean', () => {
    it('will clean', () => {
      expect(clean('item false value')).toBe('item value');
      expect(clean('user undefined profile')).toBe('user profile');
      expect(clean('line one\nline two\rline three\r\nline four')).toBe('line oneline twoline threeline four');
      expect(clean('too    many      spaces')).toBe('too many spaces');
      expect(clean('   hello world   ')).toBe('hello world');
      const input = `
        Hello false world
        undefined
        testing   multiple spaces
      `;
      expect(clean(input)).toBe('Hello world testing multiple spaces');
      expect(clean('false')).toBe('');
      expect(clean('undefined')).toBe('');
    });
  });

  describe('tw()', () => {
    it('returns a cleaned string when input is a string', () => {
      expect(tw('  some  styles  ')).toBe('some styles');
    });

    it('cleans string values within an object', () => {
      const result = tw({
        container: '  bg-blue-500  flex  ',
        text: 'text-white'
      });

      expect(result.container).toBe('bg-blue-500 flex');
      expect(result.text).toBe('text-white');
    });

    it('cleans string values within an object with a function', () => {
      const result = tw({
        container: '  bg-blue-500  flex  ',
        text: (isFoo) => tw(`${isFoo ? 'text-black false' : 'text-white'}`),
      });

      expect(result.container).toBe('bg-blue-500 flex');
      expect(result.text(true)).toBe('text-black');
      expect(result.text(false)).toBe('text-white');
    });

    it('joins and cleans array values within an object', () => {
      expect(tw({
        button: ['btn', 'btn-primary', '  p-4  ']
      }).button).toBe('btn btn-primary p-4');
    });

    it('passes through non-string/non-object values', () => {
      const result = tw({
        opacity: 1,
        visible: true
      });

      expect(result.opacity).toBe(1);
      expect(result.visible).toBe(true);
    });

    it('does not mutate the original object', () => {
      const input = { box: ' rounded ' };

      expect(tw(input)).not.toBe(input);
      expect(input.box).toBe(' rounded ');
    });
  });
});
