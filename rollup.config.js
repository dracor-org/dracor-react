import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import json from "@rollup/plugin-json";
import dts from 'rollup-plugin-dts';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

const packageJson = require('./package.json');

const plugins = [
  json(),
  peerDepsExternal(),
  resolve({ jsnext: true, preferBuiltins: true, browser: true }),
  commonjs(),
  typescript({ tsconfig: './tsconfig.json' }),
];

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins,
  },
  {
    input: 'dist/esm/types/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts.default()],
  },
  {
    input: 'src/components/ApiDoc/index.ts',
    output: {
      file: 'dist/components/ApiDoc/index.js',
      format: 'es',
      sourcemap: true,
    },
    plugins,
  },
  {
    input: 'dist/components/ApiDoc/types/components/ApiDoc/index.d.ts',
    output: [{ file: 'dist/components/ApiDoc/index.d.ts', format: 'esm' }],
    plugins: [dts.default()],
  },
];
