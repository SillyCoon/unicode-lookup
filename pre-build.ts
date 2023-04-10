(async () => {
  const unicodeData = await Bun.file('./data/UnicodeData.txt').text();

  const parseCodeAndTitle = (data: string): [string, string][] =>
    data
      .split('\n')
      .map((line) => line.split(';').slice(0, 2).reverse() as [string, string]);

  let parsed: Record<string, string> = {};

  parseCodeAndTitle(unicodeData).forEach(([title, code]) => {
    parsed[title] = code;
  });

  await Bun.write(Bun.file('./unicode.json'), JSON.stringify(parsed));
})();
