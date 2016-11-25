const ExtractTextPlugin = require('extract-text-webpack-plugin');

require("babel-polyfill");

module.exports = {
    entry: [
        // Set up an ES6-ish environment
        'babel-polyfill',

        // Add your application's scripts below
        './index.js',
    ],

    //entry: './index.js',

    output: {
        filename: 'bundle.js',
        path: "./dist",
        publicPath: ''
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.sass']
    },

    module: {

        // apply loaders to files that meet given conditions
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    plugins: [
                        "transform-decorators-legacy",
                        "syntax-async-functions",
                        "transform-async-to-generator"
                    ],
                    presets: ["react", "es2015", "stage-0"]
                }
            },
            {
                test: /\.scss$/,
                // loader: ExtractTextPlugin.extract(
                //     'style', // The backup style loader
                //     'css?sourceMap!sass?sourceMap'
                // )
                loader: 'style!css?sourceMap!sass?sourceMap'
            },

            {
                test: /\.(jpg|png)$/,
                loader: 'url-loader?limit=10000'
            },
        ],

    },
    sassLoader: {
        includePaths: ['./assets/sass']
    },

    plugins: [
        new ExtractTextPlugin('css/style.css') //[name]
    ],
};
