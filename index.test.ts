import { expect, test } from 'bun:test';
import {
  Sm,
  So,
  Pi,
  getSymbolByTitle,
  getSymbolFromCategories,
  getSymbolFromSo,
  Unicode,
} from './index';

test('returns correct unicode symbol', () => {
  const symbol: keyof Unicode = 'GEAR';
  expect(getSymbolByTitle(symbol)).toBe('\u2699');
});

test('returns correct unicode symbol from category', () => {
  const symbol: keyof So = 'GEAR';
  expect(getSymbolFromSo(symbol)).toBe('\u2699');
});

test('returns title if there is no such symbol', () => {
  const symbol = 'KEK' as any;
  expect(getSymbolByTitle(symbol)).toBe('KEK');
});

test('returns correct unicode symbol from several categories', () => {
  const symbol: keyof So = 'GEAR';
  expect(getSymbolFromCategories(symbol, [Sm, So])).toBe('\u2699');
});

test('returns title if there is no such symbol in categories', () => {
  const symbol: keyof So = 'GEAR';
  expect(getSymbolFromCategories(symbol, [Sm, Pi])).toBe(symbol);
});

test('returns title if the categories list is empty', () => {
  const symbol: keyof So = 'GEAR';
  expect(getSymbolFromCategories(symbol, [])).toBe(symbol);
});
