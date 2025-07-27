import svgr from '@svgr/rollup';
import preserveDirectives from 'rollup-plugin-preserve-directives';
import typescript from '@rollup/plugin-typescript';

export default {
    input: {
        input: 'src/index.ts'
    },
    output: {
        dir: 'dist',
        format: 'esm',
        preserveModules: true,
        sourcemap: true
    },
    plugins: [
        svgr(),
        preserveDirectives(),
        typescript({
            tsconfig: './tsconfig.json'
        })
    ],
    external: [
        'react',
        'react-dom'
    ],
    // onwarn(warning, warn) {
    //     if (warning.code === "MODULE_LEVEL_DIRECTIVE") return;
    //     warn(warning);
    // }
};