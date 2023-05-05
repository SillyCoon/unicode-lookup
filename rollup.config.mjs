import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';

export default {
  input: './index.ts',
  output: {
    file: './lib/bundle.js',
    format: 'es',
    sourcemap: true
  },
  plugins: [typescript({ tsconfig: './tsconfig.build.json' }), json(), terser()]
};
