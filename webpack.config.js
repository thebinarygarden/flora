const path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/index.ts',  // Entry point of your library
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js', // CommonJS build
        libraryTarget: 'umd',  // UMD module, usable in different environments
        library: 'flora',
        globalObject: 'typeof self !== "undefined" ? self : this', // Ensures compatibility in different environments
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    externals: {
        react: 'react',  // Assumes React is available as a peer dependency
        'react-dom': 'react-dom',
        'framer-motion': 'framer-motion',
        'styled-components': 'styled-components',  // Externalize styled-components
    },
    resolve: {
        extensions: ['.tsx', '.ts'],
    },
    devtool: 'source-map',  // Helpful for debugging
};