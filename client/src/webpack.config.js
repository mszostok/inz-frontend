const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: './index.js',

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
                    presets: ["react", "es2015"]
                }
            },
            {
                test: /\.scss$/,
                // loader: ExtractTextPlugin.extract(
                //     'style', // The backup style loader
                //     'css?sourceMap!sass?sourceMap'
                // )
                loader: 'style!css?sourceMap!sass?sourceMap'
            }
        ],

    },
    sassLoader: {
        includePaths: ['./assets/sass']
    },

    plugins: [
        new ExtractTextPlugin('css/style.css') //[name]
    ],
}
