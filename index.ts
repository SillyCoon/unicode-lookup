import { CategoriesUnion } from './src';
import { getSymbolFrom } from './utils';

export * from './src';
export { getSymbolFromUnicode as getSymbolByTitle } from './src';

export const getSymbolFromCategories = (
  title: string,
  categories: CategoriesUnion[],
) => {
  for (const category of categories) {
    const maybeSymbol = getSymbolFrom(category, title);
    if (maybeSymbol !== title) return maybeSymbol;
  }
  return title;
};
