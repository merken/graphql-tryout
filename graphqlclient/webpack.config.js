var webpack = require('webpack');
var path = require('path');
var ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
    entry: "./src/index.tsx",
    output: {
        filename: "bundle.js",
        path: __dirname + "/dist"
    },
    mode: "development",

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    // module: {
    //     rules: [
    //         // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader' or awesome-typescript-loader'.
    //         {
    //             test: /\.tsx?$/,
    //             loader: "ts-loader"
    //         },

    //         // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
    //         {
    //             enforce: "pre",
    //             test: /\.js$/,
    //             loader: "source-map-loader",
    //             exclude: []
    //         }
    //     ]
    // },
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },
    node: {
        fs: "empty"
    },

    module: {
        rules: [{
            test: /\.tsx?$/,
            exclude: /node_modules/,
            use: [{
                    loader: 'babel-loader'
                },
                {
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true
                    }
                },
                {
                    loader: "source-map-loader",
                }
            ],
        }, ],
    },
    plugins: [
        new ForkTsCheckerWebpackPlugin(),
        new webpack.LoaderOptionsPlugin({
            options: {
                test: /\.ts$/,
                ts: {
                    compiler: 'typescript',
                    configFileName: 'tsconfig.json'
                },
                tslint: {
                    emitErrors: true,
                    failOnHint: true
                }
            }
        })
    ]
};