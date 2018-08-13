const path = require('path');
const webpack = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const config = require('../config');

const utils = require('./utils');

const env = utils.getEvnConfig();

const createLintingRule = () => ({
    test: /\.(js|vue)$/,
    loader: 'eslint-loader',
    enforce: 'pre',
    include: [resolve('vuesrc'), resolve('test')],
    options: {
        formatter: require('eslint-friendly-formatter'),
        emitWarning: !config.dev.showEslintErrorsInOverlay
    }
});

module.exports = {
    mode: env.env,
    context: path.resolve(__dirname, '../'),
    resolve: {
        extensions: ['.js', '.ts', '.tsx']
        // alias: { // 使用别名后types的路径不正确
        //     './src': utils.absPath('src'),
        //     './common': utils.absPath('src/common'),
        //     './base': utils.absPath('src/modules/base')
        // }
    },
    module: {
        rules: [
            ...(config.dev.useEslint ? [createLintingRule()] : []),
            {
                test: /\.jsx?$/,
                use: 'babel-loader'
            }, {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true,
                        appendTsSuffixTo: [/\.vue$/]
                    // happyPackMode: true
                    }
                }]
            }]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': JSON.stringify(env.env)
        }),
        new ForkTsCheckerWebpackPlugin({
            tsconfig: utils.absPath('tsconfig.json'),
            checkSyntacticErrors: true,
            tslint: utils.absPath('tslint.json'),
            vue: true,
            async: true,
            memoryLimit: 4096,
            formatter: 'codeframe', // 'default' | 'codeframe',
            formatterOptions: {
                highlightCode: true, // false
                forceColor: true, // false
                linesBelow: 1, // 3
                linesAbove: 1 // 2
            }
        })
    ],
    node: {
        // prevent webpack from injecting useless setImmediate polyfill because Vue
        // source contains it (although only uses it if it's native).
        setImmediate: false,
        // prevent webpack from injecting mocks to Node native modules
        // that does not make sense for the client
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    }
};
