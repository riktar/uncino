
import esbuild from 'rollup-plugin-esbuild'
import { terser } from "rollup-plugin-terser";

export default [
  {
    input: `src/index.mjs`,
    plugins: [esbuild(), terser()],
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