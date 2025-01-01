import preserveDirectives from 'rollup-plugin-preserve-directives';
import typescript from '@rollup/plugin-typescript';

export default {
    input: 'src/index.ts', // Entry point
    output: {
        dir: 'dist', // Output directory
        format: 'es', // ESM output
        preserveModules: true, // Ensures each component has its own file
        preserveModulesRoot: 'src', // Keeps folder structure under `src`
    },
    plugins: [
        preserveDirectives(), // Retains "use client" directive
        typescript({
            tsconfig: './tsconfig.json'
        }),
    ],
    external: [
        'react',
        'react-dom',
        'styled-components',
        'motion',
        'motion/react',
    ], // Mark peer dependencies as external
};
