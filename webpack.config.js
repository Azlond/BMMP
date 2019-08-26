const path = require('path');
/*const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const config = require('./config.js/index.js');*/
const TerserPlugin = require('terser-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
//TODO: don't include phaser in bundle
module.exports = (env, options) => ({
    entry: './game/main.ts',
    output: {
        path: path.resolve(__dirname, 'dist', 'js'),
        filename: 'game.js'
    },
    resolve: {
        extensions: ['.ts', '.js', '.json']
    },
    externals: [nodeExternals()], //TODO:
    /*plugins: [
        new webpack.DefinePlugin({
            __HOST__: `'${config.host}'`,
            __PORT__: config.port
        }),
        new CopyWebpackPlugin([{
            from: './src/css/',
            to: '../css/'
        },
        {
            from: './src/images',
            to: '../images/'
        }]),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: '../light.html',
            minify: {
                collapseWhitespace: true,
                html5: true,
                keepClosingSlash: false,
                preserveLineBreaks: false,
                removeComments: true,
                removeRedundantAttributes: true
            }
        })
    ],*/
    optimization: {
        minimize: false,
        minimizer: [
            new TerserPlugin({
                cache: true,
                parallel: true,
                terserOptions: {
                    compress: {
                        booleans_as_integers: false,
                        drop_console: true,
                        drop_debugger: true
                    }
                }
            })
        ]
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js|\.ts$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {
                    cache: false,
                    failOnWarning: false, //TODO:
                    failOnError: true
                }
            },
            { test: /\.tsx?$/, loader: 'ts-loader' }
        ]
    }
});
