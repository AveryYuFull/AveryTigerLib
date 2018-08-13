const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const baseConfig = require('./webpack.base.config');

const config = require('../config');
const utils = require('./utils');

const HOST = process.env.HOST;
const PORT = process.env.PORT && Number(process.env.PORT);

console.log(utils.absPath('example/main.ts'));

module.exports = merge(baseConfig, {
    entry: { main: utils.absPath('example/main.ts') },
    output: {
        path: utils.absPath('./dist'),
        filename: 'bundle.js',
        chunkFilename: './chunk/[id].[chunkhash].js'
    },
    optimization: {
        splitChunks: {
        // chunks: "initial", // 必须三选一： "initial" | "all"(默认就是all) | "async"
        // minSize: 0, // 最小尺寸，默认0
            minChunks: 3, // 最小 chunk ，默认1
            // maxAsyncRequests: 1, // 最大异步请求数， 默认1
            // maxInitialRequests : 1, // 最大初始化请求书，默认1
            name: 'main' // 名称，此选项可接收 function
        // cacheGroups:{ // 这里开始设置缓存的 chunks
        //     priority: 0, // 缓存组优先级
        //     'main': { // key 为entry中定义的 入口名称
        //         // chunks: "initial", // 必须三选一： "initial" | "all" | "async"(默认就是异步)
        //         test: /react|lodash/, // 正则规则验证，如果符合就提取 chunk
        //         name: "main", // 要缓存的 分隔出来的 chunk 名称
        //         minSize: 0,
        //         minChunks: 3,
        //         enforce: true,
        //         maxAsyncRequests: 1, // 最大异步请求数， 默认1
        //         maxInitialRequests : 1, // 最大初始化请求书，默认1
        //         reuseExistingChunk: true // 可设置是否重用该chunk（查看源码没有发现默认值）
        //     }
        // }
        }
    },
    plugins: [
        new UglifyJsPlugin({
            uglifyOptions: {
                compress: {
                    warnings: false
                }
            },
            sourceMap: config.build.productionSourceMap,
            parallel: true
        }), // extract css into its own file
        new ExtractTextPlugin({
            filename: utils.assetsAllPath('[name]/style.css'),
            allChunks: true
        }),
        // Compress extracted CSS. We are using this plugin so that possible
        // duplicated CSS from different components can be deduped.
        new OptimizeCSSPlugin({
            cssProcessorOptions: config.build.productionSourceMap
                ? { safe: true, map: { inline: false } }
                : { safe: true }
        }),
        new webpack.HashedModuleIdsPlugin(),
        // enable scope hoisting
        new webpack.optimize.ModuleConcatenationPlugin(),
        new HtmlWebpackPlugin({
            filename: './index.html',
            template: 'example/index.html'
        })
    ]
});