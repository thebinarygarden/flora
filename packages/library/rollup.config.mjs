import svgr from '@svgr/rollup';
import preserveDirectives from 'rollup-plugin-preserve-directives';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import tailwindcss from '@tailwindcss/postcss';

export default {
    input: ['src/index.ts', 'src/styles.css'],
    output: {
        dir: 'dist',
        format: 'esm',
        preserveModules: true,
        preserveModulesRoot: 'src',
        sourcemap: true
    },
    plugins: [
        svgr(),
        preserveDirectives(),
        postcss({
            extract: 'styles.css',
            minimize: true,
            plugins: [
                tailwindcss()
            ]
        }),
        typescript({
            tsconfig: './tsconfig.json',
            declaration: true,
            declarationMap: true,
            declarationDir: 'dist'
        })
    ],
    external: [
        'react',
        'react-dom',
        'react/jsx-runtime'
    ],
    // onwarn(warning, warn) {
    //     if (warning.code === "MODULE_LEVEL_DIRECTIVE") return;
    //     warn(warning);
    // }
};