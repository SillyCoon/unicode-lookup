interface UnicodeData {
  title: string;
  category: string;
  code: string;
}

const notUnicode = (category: string) => category !== 'Unicode';

// prettier-ignore
// typescript can't generate types for entire Unicode dict
// since it's too big, so we skip export of UnicodeLookup
const makeCategoryLookupFunction = (category: string) =>
`import ${category}Dict from '../unicode/${category}.json' assert { type: 'json' };
import { getSymbolFrom } from '../utils';

${notUnicode(category) ? `export const ${category}Lookup = ${category}Dict;` : ''}
export type ${category} = typeof ${category}Dict;
export const getSymbolFrom${category} = (title: keyof ${category}) =>
  getSymbolFrom(${category}Dict, title);
`;

const makeCategoriesUnion = (categories: string[]) =>
  [
    `import { ${categories.join(', ')} } from '.';`,
    `export type CategoriesUnion = ${categories.join(' | ')}`,
  ].join(`\n`);

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

const writeCategory = async (category: string, data: Record<string, string>) =>
  Promise.all([
    write(`./unicode/${category}.json`, JSON.stringify(data)),
    write(`./src/${category}.ts`, makeCategoryLookupFunction(category)),
  ]);

(async () => {
  const unicodeData = await Bun.file('./data/UnicodeData.txt').text();
  const parsedData = parse(unicodeData);

  const splittedByCategory = {
    ...splitByCategory(parsedData),
    Unicode: toDictionaryByTitle(parsedData),
  };
  const categories = Object.keys(splittedByCategory);

  await Promise.all([
    ...Object.entries(splittedByCategory).map(([category, data]) =>
      writeCategory(category, data),
    ),
    write(
      './src/index.ts',
      [...categories, 'CategoriesUnion']
        .map((c) => `export * from './${c}';`)
        .join('\n'),
    ),
  ]);

  await write(
    './src/CategoriesUnion.ts',
    makeCategoriesUnion(categories.filter(notUnicode)),
  );
})();
