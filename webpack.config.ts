import * as path from 'path';
import webpack from 'webpack';

export default {
    mode: 'production',
    target:"electron-main",
    entry: './src/electron.ts',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'electron.js'
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['.ts', '.js', '.tsx'],
    },

    module: {
        rules: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                exclude: /node_modules/,
                options: {onlyCompileBundledFiles: true,configFile: "tsconfig.webpack.json"},

            }
        ]
    }
} as webpack.Configuration

