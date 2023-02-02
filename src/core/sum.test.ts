import { sum } from './sum';

describe('Sum', () => {
  test('should sum', () => {
    expect(sum(2, 2)).toBe(4);
  });
});
