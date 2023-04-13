import { expect, test } from 'bun:test';
import { getSymbolByTitle } from './index';

test('get correct unicode symbol', () => {
  expect(getSymbolByTitle('GEAR')).toBe('\u2699');
});

test('returns title if there is no such symbol', () => {
  expect(getSymbolByTitle('KEK' as any)).toBe('KEK');
});
