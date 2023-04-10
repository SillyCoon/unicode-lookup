import config from './config.json';

(async () => {
  const unicodeData = await Bun.file('./data/UnicodeData.txt').text(); //await response.statusText;

  const parseCodeAndTitle = (data: string): [string, string][] =>
    data
      .split('\n')
      .map((line) => line.split(';').slice(0, 2).reverse() as [string, string]);

  let parsed: Record<string, string> = {};

  parseCodeAndTitle(unicodeData).forEach(([title, code]) => {
    parsed[formatTitle(title)] = hexToUnicode(code);
  });

  await Bun.write(
    Bun.file('./dist/unicode.json'),
    JSON.stringify(parsed, null, 2),
  );
})();

const formatTitle = (title: string) => {
  const formatted = `${config.prefix}${title.replaceAll(' ', config.replacer)}`;
  return config.lowercase ? formatted.toLowerCase() : formatted;
};

const hexToUnicode = (hex: string) => String.fromCodePoint(parseInt(hex, 16));
