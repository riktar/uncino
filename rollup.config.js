
import esbuild from 'rollup-plugin-esbuild'
export default [
  {
    input: `src/index.mjs`,
    plugins: [esbuild()],
    output: [
      {
        file: `dist/uncino.js`,
        format: 'cjs',
        sourcemap: false,
        exports: 'default'
      },
    ]
  },
];