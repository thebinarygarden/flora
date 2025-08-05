import svgr from '@svgr/rollup';
import preserveDirectives from 'rollup-plugin-preserve-directives';
import typescript from '@rollup/plugin-typescript';

export default {
    input: 'src/index.ts',
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
        typescript({
            tsconfig: './tsconfig.json',
            declaration: false,
            declarationMap: false
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