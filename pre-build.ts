interface UnicodeData {
  title: string;
  category: string;
  code: string;
}

// prettier-ignore
const makeCategoryLookupFunction = (category: string) =>
`import ${category}Dict from '../unicode/${category}.json' assert { type: 'json' };
import { getSymbolFrom } from '../utils';

export type ${category} = typeof ${category}Dict;
export const getSymbolFrom${category} = (title: keyof ${category}) => {
  return getSymbolFrom(${category}Dict, title);
}`;

type Parsed = ReturnType<typeof parse>;

const parse = (data: string) =>
  data.split('\n').map((line) => {
    const splitted = line.split(';');
    return {
      code: splitted[0],
      title: splitted[1],
      category: splitted[2],
    };
  });

const toDictionaryByTitle = (parsedData: Parsed) => {
  let dict: Record<string, string> = {};
  parsedData.forEach(({ code, title }) => {
    dict[title] = code;
  });
  return dict;
};

const splitByCategory = (
  parsedData: Parsed,
): Record<string, Record<string, string>> => {
  let parsedByCategory: Record<string, Record<string, string>> = {};

  parsedData.forEach(({ category, title, code }) => {
    parsedByCategory[category]
      ? (parsedByCategory[category][title] = code)
      : (parsedByCategory[category] = { [title]: code });
  });
  return parsedByCategory;
};

const write = async (path: string, data: string) =>
  Bun.write(Bun.file(path), data);

(async () => {
  const unicodeData = await Bun.file('./data/UnicodeData.txt').text();
  const parsedData = parse(unicodeData);

  const dict = toDictionaryByTitle(parsedData);
  const splittedByCategory = splitByCategory(parsedData);
  const categories = Object.keys(splittedByCategory);

  await Promise.all([
    ...Object.entries(splittedByCategory).map(([category, data]) => {
      return Promise.all([
        write(`./unicode/${category}.json`, JSON.stringify(data)),
        write(`./src/${category}.ts`, makeCategoryLookupFunction(category)),
      ]);
    }),
    write(
      './src/index.ts',
      categories.map((c) => `export * from './${c}';`).join('\n'),
    ),
  ]);
})();
