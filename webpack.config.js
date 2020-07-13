module.exports = (env, argv) => {

    let config = null;

    if (argv.mode === 'development') {
        config = require('./webpack.config.dev');
    }else{
        config = require('./webpack.config.prod');
    }

    return config;
};