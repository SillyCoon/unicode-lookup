interface UnicodeData {
  title: string;
  category: string;
  code: string;
}

(async () => {
  const unicodeData = await Bun.file('./data/UnicodeData.txt').text();

  const parseCodeAndTitle = (data: string) =>
    data.split('\n').map((line) => {
      const splitted = line.split(';');
      return {
        code: splitted[0],
        title: splitted[1],
        category: splitted[2],
      };
    });

  // prettier-ignore
  const makeCategoryLookupFunction = (category: string) =>
`import ${category}Dict from '../unicode/${category}.json' assert { type: 'json' };
import { getSymbolByTitle } from '../utils';

export type ${category} = typeof ${category}Dict;
export const getSymbolFrom${category} = (title: keyof ${category}) => {
  return getSymbolByTitle(${category}Dict, title);
}`;

  let parsedByCategory: Record<string, Record<string, string>> = {};

  parseCodeAndTitle(unicodeData).forEach(({ category, title, code }) => {
    parsedByCategory[category]
      ? (parsedByCategory[category][title] = code)
      : (parsedByCategory[category] = { [title]: code });
  });

  const categories = Object.keys(parsedByCategory);

  await Promise.all([
    ...Object.entries(parsedByCategory).map(([category, data]) => {
      return Promise.all([
        Bun.write(Bun.file(`./unicode/${category}.json`), JSON.stringify(data)),
        Bun.write(
          Bun.file(`./src/${category}.ts`),
          makeCategoryLookupFunction(category),
        ),
      ]);
    }),
    Bun.write(
      Bun.file('./src/index.ts'),
      categories.map((c) => `export * from './${c}';`).join('\n'),
    ),
  ]);
})();
