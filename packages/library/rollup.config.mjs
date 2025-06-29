import svgr from '@svgr/rollup';
import preserveDirectives from 'rollup-plugin-preserve-directives';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';

export default {
    input: {
        core: 'src/index_core.ts',
        icons: 'src/index_icons.ts',
        navigation: 'src/index_navigation.ts',
        theme: 'src/index_theme.ts',
        input: 'src/index_input.ts'
    },
    output: {
        dir: 'dist',
        format: 'esm',
        preserveModules: true
    },
    plugins: [
        svgr(),
        preserveDirectives(),
        postcss({
            extract: true, // emits CSS files per JS entry
            plugins: [
                require('tailwindcss'),
                require('autoprefixer')
            ],
            minimize: true
        }),
        typescript({
            tsconfig: './tsconfig.json'
        })
    ],
    external: [
        'react',
        'react-dom',
        'motion',
        'motion/react'
    ],
    onwarn(warning, warn) {
        if (warning.code === "MODULE_LEVEL_DIRECTIVE") {
            return; // ignore use client warnings
        }
        warn(warning);
    }
};