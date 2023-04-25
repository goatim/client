import path from 'path';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import pkg from './package.json';

const { dependencies = {}, peerDependencies = {} } = pkg;

const externals = [...Object.keys(dependencies), ...Object.keys(peerDependencies)];

const src = path.resolve(__dirname, 'src');
const input = path.resolve(src, 'index.ts');

export default [
  {
    input,
    external: (id) => externals.some((dep) => id === dep || id.startsWith(`${dep}/`)),
    plugins: [
      typescript({ tsconfig: './tsconfig.json' }),
      commonjs(),
      json(),
      resolve({ browser: true }),
      babel({
        extensions: ['.ts', '.js', '.tsx', '.jsx'],
      }),
    ],
    output: [
      {
        name: pkg.name,
        file: pkg.main,
        format: 'es',
        plugins: [terser()]
      },
      {
        file: pkg.cjs,
        format: 'cjs',
        plugins: [terser()]
      },
      {
        name: pkg.name,
        file: pkg.umd,
        format: 'umd',
        globals: {
          react: 'React',
        },
        plugins: [terser()]
      },
    ],
  },
];
