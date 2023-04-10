import unicode from './unicode.json' assert { type: 'json' };

export type Unicode = typeof unicode;
export const getSymbolByTitle = (title: keyof Unicode) =>
  hexToUnicode(unicode[title]);

const hexToUnicode = (hex: string) => String.fromCodePoint(parseInt(hex, 16));
