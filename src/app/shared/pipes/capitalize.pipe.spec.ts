import { CapitalizePipe } from './capitalize.pipe';

describe('CapitalizePipe', () => {
  let pipe: CapitalizePipe;

  beforeEach(() => {
    pipe = new CapitalizePipe();
  });

  it('should capitalize the first letter of a string', () => {
    expect(pipe.transform('hello')).toBe('Hello');
  });

  it('should lowercase the rest of the string', () => {
    expect(pipe.transform('hELLo')).toBe('Hello');
  });

  it('should handle empty strings gracefully', () => {
    expect(pipe.transform('')).toBe('');
  });
});
