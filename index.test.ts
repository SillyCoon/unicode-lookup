import { expect, test } from 'bun:test';
import { getSymbol } from './index';

test('get correct unicode symbol', () => {
  expect(getSymbol('GEAR')).toBe('\u2699');
});
