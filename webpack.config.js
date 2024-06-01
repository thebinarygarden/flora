const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.ts',  // Entry point of your library
    output: {
        globalObject: 'typeof self !== "undefined" ? self : this',
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
        libraryTarget: 'umd',  // Important for library to be usable in various environments
        library: 'flora'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            }
        ]
    },
    externals: {
        react: 'react',  // Assumes React is available as a peer dependency
        'react-dom': 'react-dom'
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx']
    }
};
