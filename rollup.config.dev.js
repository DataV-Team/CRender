import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import replace from '@rollup/plugin-replace'
import typescript from 'rollup-plugin-typescript2'
import postcss from 'rollup-plugin-postcss'

export default {
  input: './dev.tsx',
  output: {
    name: 'dev',
    file: 'dev/dev.js',
    format: 'iife',
    sourcemap: true,
    globals: {
      react: 'React',
      'react-dom': 'ReactDOM',
      'prop-types': 'PropTypes',
    },
  },
  external: ['react', 'react-dom'],
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    typescript({ tsconfigOverride: { compilerOptions: { declaration: false } } }),
    postcss(),
    resolve(),
    commonjs(),
  ],
  watch: {
    include: ['./dev.tsx', 'src/**'],
  },
}
