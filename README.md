# Unicode-lookup

## Lookup by all symbols

Use a typed function to get the Unicode symbol by the title or the title itself if there is no such symbol.

```typescript
const symbol = getSymbolByTitle('GEAR'); // ⚙
const noSuchSymbol = getSymbolByTitle('NO SYMBOL'); // NO SYMBOL
```

Supported Unicode version: 15

## Lookup by category

Use separate functions according to categories described in [UnicodeData](https://www.unicode.org/L2/L1999/UnicodeData.html) if you want only a subset of symbols and support a tree shaking.

```typescript
const symbol = getSymbolFromSo('GEAR'); // ⚙
const noSuchSymbol = getSymbolFromSo('PLUS SIGN'); // PLUS SIGN
```

## Lookup by several categories

Use the `getSymbolFromCategories` function if you want to try to extract a symbol from several categories.

```typescript
const symbol = getSymbolFromCategories('GEAR', [Sm, So]); // ⚙
const noSuchSymbol = getSymbolFromCategories('GEAR', [Sm, Pi]); // GEAR
const emptyList = getSymbolFromCategories('GEAR', []); // GEAR
```
