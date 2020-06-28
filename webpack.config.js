const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: ["babel-polyfill", "react-hot-loader/patch", "./src/main/webapp/index.js"],
    output: {
        path : path.join(__dirname,'src/main/webapp'),
        filename: "bundle.js",
        hotUpdateChunkFilename: 'hot/hot-update.js',
        hotUpdateMainFilename: 'hot/hot-update.json'
    },
    devServer: {
        contentBase: './src/main/webapp/index.js',
        host: '127.0.0.1',
        compress: true,
        port: 3000,
        historyApiFallback: true,
        quiet: true
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/main/webapp/index.html",
            filename: "./index.html",
            favicon: './src/main/webapp/favicon.ico'
        })
    ]
};
