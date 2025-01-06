import path from 'path';
import svgr from '@svgr/rollup';
import preserveDirectives from 'rollup-plugin-preserve-directives';
import typescript from '@rollup/plugin-typescript';
import alias from "@rollup/plugin-alias";

const rootPath = path.resolve('./dist/'); // Your project root directory

const replaceAbsolutePathsPlugin = () => ({
    name: 'replace-absolute-paths',
    generateBundle(_, bundle) {
        for (const fileName in bundle) {
            const chunk = bundle[fileName];
            if (chunk.type === 'chunk') {
                chunk.code = chunk.code.replace(
                    new RegExp(rootPath, 'g'), // Replace all occurrences of the absolute path
                    '.'
                );
            }
        }
    },
});

export default [

    // CLIENT COMPONENTS FIRST
    // --------- index_client_internal
    {
        input: 'src/index_client_internal_styles.ts',
        output: {
            dir: 'dist',
            format: 'esm',
            preserveModules: true,
        },
        plugins: [
            preserveDirectives(),
            typescript({
                tsconfig: './tsconfig.json'
            })
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
    },


    // --------- index_client_theme
    {
        input: 'src/index_client_theme.ts',
        output: {
            dir: 'dist',
            format: 'esm',
            preserveModules: true,
        },
        plugins: [
            preserveDirectives(),
            typescript({
                tsconfig: './tsconfig.json'
            })
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
    },


    // --------- index_bg
    {
        input: 'src/index_bg.ts',
        output: {
            dir: 'dist',
            format: 'esm'
        },
        plugins: [
            svgr(),
            alias({
                entries: [
                    {
                        find: '@styles',
                        replacement: path.resolve('./dist/components/bg/BGLanding/styles.js')
                    },
                    {
                        find: '@components/bg/BGLanding/useAnimatedFields',
                        replacement: path.resolve('./dist/components/bg/BGLanding/useAnimatedFields.js')
                    },
                    {
                        find: '@components/bg/BGLanding/useVideoLooper',
                        replacement: path.resolve('./dist/components/bg/BGLanding/useVideoLooper.js')
                    },
                    {
                        find: '@components/bg/BGLanding/useThumbnailScrolling',
                        replacement: path.resolve('./dist/components/bg/BGLanding/useThumbnailScrolling.js')
                    },
                    {
                        find: '@components/theme/FloraThemeProvider',
                        replacement: path.resolve('./dist/components/theme/FloraThemeProvider.js')
                    }
                ],
                customResolver: {
                    resolveId(source) {
                        // Return the exact replacement string provided
                        return source;
                    },
                },
            }),
            typescript({
                tsconfig: './tsconfig.json'
            }),
            replaceAbsolutePathsPlugin()
        ],
        external: [
            'react',
            'react-dom',
            'styled-components',
            'motion',
            'motion/react',
            path.resolve('./dist/components/bg/BGLanding/styles.js'),
            path.resolve('./dist/components/bg/BGLanding/useAnimatedFields.js'),
            path.resolve('./dist/components/bg/BGLanding/useVideoLooper.js'),
            path.resolve('./dist/components/bg/BGLanding/useThumbnailScrolling.js'),
            path.resolve('./dist/components/theme/FloraThemeProvider.js'),
        ],
        onwarn(warning, warn) {
            if (warning.code === "MODULE_LEVEL_DIRECTIVE") {
                return;
            }
            warn(warning);
        }
    },


    // --------- index_navigation
    {
        input: 'src/index_navigation.ts',
        output: {
            dir: 'dist',
            format: 'esm',
        },
        plugins: [
            svgr(),
            alias({
                entries: [
                    {
                        find: '@styles',
                        replacement: path.resolve('./dist/components/navigation/styles.js')
                    },
                ],
                customResolver: {
                    resolveId(source) {
                        // Return the exact replacement string provided
                        return source;
                    },
                },
            }),
            typescript({
                tsconfig: './tsconfig.json'
            }),
            replaceAbsolutePathsPlugin()
        ],
        external: [
            'react',
            'react-dom',
            'styled-components',
            'motion',
            'motion/react',
            path.resolve('./dist/components/navigation/styles.js')
        ],
        onwarn(warning, warn) {
            if (warning.code === "MODULE_LEVEL_DIRECTIVE") {
                return;
            }
            warn(warning);
        }
    },


    // --------- index_icons
    {
        input: 'src/index_icons.ts',
        output: {
            dir: 'dist',
            format: 'esm',
        },
        plugins: [
            svgr(),
            typescript({
                tsconfig: './tsconfig.json'
            })
        ],
        external: [
            'react',
            'react-dom',
            'styled-components',
            'motion',
            'motion/react'
        ]
    }
];
