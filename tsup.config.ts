import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['index.ts'],
  splitting: false,
  dts: true,
  minify: true,
  format: 'esm',
  tsconfig: './tsconfig.build.json',
  clean: true,
  outDir: 'lib',
});
