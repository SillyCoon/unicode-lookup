import unicode from './unicode.json' assert { type: 'json' };

export type Unicode = typeof unicode;
/**
 * @returns Unicode representation of the title or the title itself
 * if there is no such symbol
 */
export const getSymbolByTitle = (title: keyof Unicode): string => {
  const maybeCode = unicode[title];
  return maybeCode ? hexToUnicode(maybeCode) : title;
};

const hexToUnicode = (hex: string) => String.fromCodePoint(parseInt(hex, 16));
