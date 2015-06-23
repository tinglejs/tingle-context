var pkg = require('./package.json');
var webpack = require('webpack');
module.exports = {
    cache: false,
    entry: {
        tingle: './src',
        demo: './demo'
    },
    output: {
        path: './dist',
        filename: "[name].js",
        sourceMapFilename: "[name].js.map"
    },
    devtool: '#source-map', // 这个配置要和output.sourceMapFilename一起使用
    module: {
        loaders: [
            {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?stage=1'}
        ]
    },
    resolve: {
        alias: (function () {
            var alias = {};
            // 按字母排序
            var components = [
                'tingle-dialog',
                'tingle-group-list',
                'tingle-layer',
                'tingle-mask',
                'tingle-on-off',
                'tingle-on-off-field',
                'tingle-slide',
                'tingle-style',
                'tingle-text-field',
                'tingle-textarea-field',
                'tingle-tip',
            ];
            components.forEach(function (item) {
                alias[item] = __dirname + '/tingle/' + item + '/src'
            });
            return alias;
        })()
    },
    externals: {
        react: 'var React' // 相当于把全局的React作为模块的返回 module.exports = React;
    },
    plugins: [
        new webpack.DefinePlugin({
          __LOCAL__: true, // 本地环境
          __DEV__: true, // 日常环境
          __PRO__: false // 生产环境
        })
    ]
};