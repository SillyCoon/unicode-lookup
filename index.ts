import unicode from './unicode.json';
import config from './config.json';

export type Unicode = typeof unicode;
export const getSymbol = (title: keyof Unicode) => {
  hexToUnicode(unicode[title]);
};

const hexToUnicode = (hex: string) => String.fromCodePoint(parseInt(hex, 16));

const formatTitle = (title: string) => {
  const formatted = `${config.prefix}${title.replaceAll(' ', config.replacer)}`;
  return config.lowercase ? formatted.toLowerCase() : formatted;
};
