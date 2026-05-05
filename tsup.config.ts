import { defineConfig } from 'tsup';

export default defineConfig(async () => {
  return {
    entry: {
      'index': 'src/index.ts',
      'modules/string/string.module': 'src/modules/string/string.module.ts',
    },
    format: ['cjs', 'esm'],
    dts: true,
    clean: true,
    minify: true,
    splitting: false,
    outDir: 'dist',
  };
});