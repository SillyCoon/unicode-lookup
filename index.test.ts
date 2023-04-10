import { expect, test } from 'bun:test';
import { getSymbolByTitle } from './index';

test('get correct unicode symbol', () => {
  expect(getSymbolByTitle('GEAR')).toBe('\u2699');
});
