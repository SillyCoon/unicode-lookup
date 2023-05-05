import { CategoriesUnion, Unicode } from './src';
import { getSymbolFrom } from './utils';

export * from './src';
export { getSymbolFromUnicode as getSymbolByTitle } from './src';

export const getSymbolFromCategories = (
  title: keyof Unicode,
  categories: CategoriesUnion[],
) => {
  for (const category of categories) {
    const maybeSymbol = getSymbolFrom(category, title);
    if (maybeSymbol !== title) return maybeSymbol;
  }
  return title;
};
