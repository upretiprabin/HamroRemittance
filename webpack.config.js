const path = require('path');

module.exports = {
    entry: ["babel-polyfill", "./src/main/webapp/index.js"],
    output: {
        path: path.join(__dirname, 'grails-app/assets/javascripts'),
        publicPath: '/assets/',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: path.join(__dirname, 'src/main/webapp'),
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    mode: "development" //TODO: revert later
};

