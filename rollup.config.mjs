import svgr from '@svgr/rollup';
import preserveDirectives from 'rollup-plugin-preserve-directives';
import typescript from '@rollup/plugin-typescript';

export default {
    input: {
        bg: 'src/index_bg.ts',
        icons: 'src/index_icons.ts',
        navigation: 'src/index_navigation.ts',
        theme: 'src/index_theme.ts',
        input: 'src/index_input.ts'
    },
    output: {
        dir: 'dist',
        format: 'esm',
        preserveModules: true,
    },
    plugins: [
        svgr(),
        preserveDirectives(),
        typescript({
            tsconfig: './tsconfig.json'
        }),
    ],
    external: [
        'react',
        'react-dom',
        'styled-components',
        'motion',
        'motion/react'
    ],
    onwarn(warning, warn) {
        if (warning.code === "MODULE_LEVEL_DIRECTIVE") {
            return;
        }
        warn(warning);
    }
};