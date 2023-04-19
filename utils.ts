export const getSymbolByTitle = (
  lookup: Record<string, string>,
  title: string,
): string => {
  const maybeCode = lookup[title];
  return maybeCode ? hexToUnicode(maybeCode) : title;
};

const hexToUnicode = (hex: string) => String.fromCodePoint(parseInt(hex, 16));
