import svgr from '@svgr/rollup';
import preserveDirectives from 'rollup-plugin-preserve-directives';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import atImport from 'postcss-import';

export default {
  input: [
    'src/form/index.ts',
    'src/ui/index.ts',
    'src/overlay/index.ts',
    'src/bg/index.ts',
    'src/hooks/index.ts',
    'src/icons/index.ts',
    'src/marketing/index.ts',
    'src/navigation/index.ts',
    'src/theme/index.ts',
    'src/styles.css',
  ],
  output: {
    dir: 'dist',
    format: 'esm',
    preserveModules: true,
    preserveModulesRoot: 'src',
    sourcemap: true,
  },
  plugins: [
    svgr(),
    preserveDirectives(),
    postcss({
      extract: 'styles.css',
      minimize: true,
      // Inlines the ./tokens/*.css imports so dist/styles.css is self-contained.
      plugins: [atImport()],
    }),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationMap: true,
      declarationDir: 'dist',
    }),
  ],
  external: ['react', 'react-dom', 'react/jsx-runtime', 'framer-motion'],
  onwarn(warning, warn) {
    if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
      return;
    }
    warn(warning);
  },
};
