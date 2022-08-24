
import esbuild from 'rollup-plugin-esbuild'
export default [
  {
    input: `src/index.mjs`,
    plugins: [esbuild()],
    output: [
      {
        file: `dist/uncino-es.js`,
        format: 'es',
        sourcemap: false,
        exports: 'default'
      },
      {
        file: `dist/uncino.js`,
        format: 'cjs',
        sourcemap: false,
        exports: 'default'
      },
    ]
  },
];