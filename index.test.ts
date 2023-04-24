import { expect, test } from 'bun:test';
import { So, Unicode, getSymbolByTitle, getSymbolFromSo } from './index';

test('get correct unicode symbol', () => {
  const symbol: keyof Unicode = 'GEAR';
  expect(getSymbolByTitle(symbol)).toBe('\u2699');
  // Symbol with dash
  expect(getSymbolByTitle('Euro-Currency Sign')).toBe('\u20A0');
});

test('get correct unicode symbol from category', () => {
  const symbol: keyof So = 'GEAR';
  expect(getSymbolFromSo(symbol)).toBe('\u2699');
});

test('returns title if there is no such symbol', () => {
  expect(getSymbolByTitle('KEK' as any)).toBe('KEK');
});
