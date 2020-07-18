const path = require('path');
const fs = require('fs');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// Webpack uses `publicPath` to determine where the app is being served from.
// In development, we always serve from the root. This makes config easier.
const publicPath = '/';

// Make sure any symlinks in the project folder are resolved:
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

// plugins
// const autoprefixer = require('autoprefixer');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: ["babel-polyfill", "./src/main/webapp/index.js"],
    output: {
        path: path.join(__dirname, 'grails-app/assets/javascripts'),
        publicPath: '/assets/',
        filename: 'bundle.js'
    },
    // resolve alias (Absolute paths)
    resolve: {
        alias: {
            Actions: path.resolve(__dirname, 'src/main/webapp/actions/'),
            Components: path.resolve(__dirname, 'src/main/webapp/components/'),
            Assets: path.resolve(__dirname, 'src/main/webapp/assets/'),
            Util: path.resolve(__dirname, 'src/main/webapp/util/'),
            Routes: path.resolve(__dirname, 'src/main/webapp/routes/'),
            Constants: path.resolve(__dirname, 'src/main/webapp/constants/'),
            Helpers: path.resolve(__dirname, 'src/main/webapp/helpers/'),
            Api: path.resolve(__dirname, 'src/main/webapp/api/'),
            Middleware: path.resolve(__dirname, 'src/main/webapp/services/webServices/')
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: { minimize: true }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: 'static/media/[name].[hash:8].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=100000'
            },
            // Scss compiler
            {
                test: /\.s[ac]ss$/i,
                use: [{
                    loader: 'style-loader', // inject CSS to page
                }, {
                    loader: 'css-loader', // translates CSS into CommonJS modules
                }, {
                    loader: 'postcss-loader', // Run post css actions
                    options: {
                        plugins: function () { // post css plugins, can be exported to postcss.config.js
                            return [
                                require('precss'),
                                require('autoprefixer')
                            ];
                        }
                    }
                }, {
                    loader: 'sass-loader' // compiles Sass to CSS
                }]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin()
    ]
};
