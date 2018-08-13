'use strict';
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = require('../config');
const packageConfig = require('../package.json');

const glob = require('glob');

const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const minimist= require('minimist');
const evnOptions = {
    string: 'env',
    default: {
        host: process.env.NODE_ENV || '',
        env: process.env.NODE_ENV || '',
        environments: process.env.NODE_ENV || ''
    }
};

const env = minimist(process.argv.slice(2), evnOptions);

/**
 * 获取参数变量数据
 *
 * @returns {Object}
 */
function getEvnConfig() {
    return env;
}
exports.getEvnConfig =getEvnConfig;

/**
 * 格式化正则表达式
 *
 * @param {String} regText 表达式文本
 * @returns {String} 返回格式化好后的文本
 */
function _formatRegText(regText) {
    if (!regText) {
        return regText;
    }
    return regText.replace(/[-[\]{}()*+?.^\\$|/]/g, '\\$&');
}
exports.formatRegText=_formatRegText;

exports.assetsAllPath = function (_path) {
    const assetsSubDirectory = process.env.NODE_ENV === 'production'
        ? ''
        : config.dev.assetsSubDirectory;

    return path.posix.join(assetsSubDirectory, _path);
};

/**
 * 相对路径转成绝对路径
 *
 * @param {String} dir 路径
 * @returns {String}
 */
function absPath(dir) {
    var res = dir;

    if (!dir) {
        return res;
    }
    if (!path.isAbsolute(dir)) { // 相对路径转绝对路径
        res = path.normalize(path.join(process.cwd(), dir));
    } else {
        // res = path.normalize(dir).replace(/\\/g, '/');
    }
    return res;
}
exports.absPath=absPath;

exports.cssLoaders = function (options) {
    options = options || {};

    const cssLoader = {
        loader: 'css-loader',
        options: {
            sourceMap: options.sourceMap
        }
    };

    const postcssLoader = {
        loader: 'postcss-loader',
        options: {
            sourceMap: options.sourceMap
        }
    };

    /**
     * 生成loader配置
     *
     * @param {String} loader loader
     * @param {Object} loaderOptions loader选项
     * @returns {Object}
     */
    function generateLoaders (loader, loaderOptions) {
        const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader];

        if (loader) {
            loaders.push({
                loader: loader + '-loader',
                options: Object.assign({}, loaderOptions, {
                    sourceMap: options.sourceMap
                })
            });
        }

        // Extract CSS when that option is specified
        // (which is the case during production build)
        if (options.extract) {
            return ExtractTextPlugin.extract({
                use: loaders,
                fallback: 'vue-style-loader'
            });
        } else {
            return ['vue-style-loader'].concat(loaders);
        }
    }

    // https://vue-loader.vuejs.org/en/configurations/extract-css.html
    return {
        css: generateLoaders(),
        postcss: generateLoaders(),
        less: generateLoaders('less'),
        sass: generateLoaders('sass', { indentedSyntax: true }),
        scss: generateLoaders('sass'),
        stylus: generateLoaders('stylus'),
        styl: generateLoaders('stylus')
    };
};

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
    const output = [];
    const loaders = exports.cssLoaders(options);

    for (const extension in loaders) {
        const loader = loaders[extension];
        output.push({
            test: new RegExp('\\.' + extension + '$'),
            use: loader
        });
    }

    return output;
};

exports.getEntry = (dirText, replacePre) => {
    let filePath = glob.sync(dirText);
    let res = {};

    replacePre = replacePre || dirText.replace(/\*\*\\\*\s*$/, '').replace(/\\/gi, '/');

    if (filePath && filePath.length > 0) {
        filePath = filePath.filter(_path => {
            return /index\.(j|t)sx?$/i.test(_path);
        });
    }
    if (filePath && filePath.length) {
        filePath.forEach(_path => {
            if (_path) {
                let key = _path;
                if (replacePre) {
                    key = _path.replace(new RegExp(_formatRegText(replacePre), 'i'), '');
                    // key = key && key.replace(new RegExp('/?' + _formatRegText('index.js'), 'i'), '') || 'lib/../'
                    key = key && key.replace(new RegExp('/?index\\.(j|t)sx?', 'i'), '');
                    key = key && key.replace(new RegExp('^' + _formatRegText('packages/'), 'i'), '');
                    key = key && key.replace(new RegExp('^' + _formatRegText('components/') + '.*', 'i'), _path => {
                        // console.log(_path, $1);
                        let res = _path;
                        let arr;
                        if (_path && typeof _path === 'string') {
                            arr = _path.split('/');
                            if (arr && arr.length >= 3) {
                                res = 'modules/T' + (arr.slice(2).join('/')).replace(/^[a-zA-Z]/g, $1 => $1.toUpperCase());
                            }
                        }
                        return res;
                    });
                    key = key && key.replace(new RegExp('^' + _formatRegText('service/') + '(.*)', 'i'), (name, _path) => {
                        _path = _path && _path.replace(/^[a-zA-Z]/g, $1 => $1.toUpperCase());
                        return 'modules/S' + (_path || '');
                    });
                    key = key && key.replace(new RegExp('^' + _formatRegText('modules/') + '(.*)', 'i'), (name, _path) => {
                        _path = _path && _path.replace(/^[a-zA-Z]/g, $1 => $1.toUpperCase());
                        return 'modules/' + (_path || '');
                    });
                }
                if (key) {
                    res[key] = _path;
                }
            }
        });
    }
    return res;
};
