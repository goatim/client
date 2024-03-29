import path from 'path';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';
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
        file: pkg.main,
        format: 'cjs',
      },
      {
        name: pkg.name,
        file: pkg.module,
        format: 'es',
      },
      {
        name: pkg.name,
        file: pkg.browser,
        format: 'umd',
        globals: {
          react: 'React',
        },
      },
      {
        name: pkg.name,
        file: pkg['browser:min'],
        format: 'umd',
        globals: {
          react: 'React',
        },
        plugins: [terser()]
      },
    ],
  },
];
