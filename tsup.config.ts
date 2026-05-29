import { defineConfig } from 'tsup';

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/modules/string/index.ts',
    'src/modules/number/index.ts',
    'src/modules/array/index.ts',
    'src/modules/object/index.ts',
    'src/modules/is/index.ts',
    'src/modules/storage/index.ts',
    'src/modules/crypto/index.ts',
    'src/modules/date/index.ts',
    'src/modules/function/index.ts',
  ],
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  minify: true,
  sourcemap: true,
  splitting: false,
});