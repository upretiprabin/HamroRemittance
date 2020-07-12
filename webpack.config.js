module.exports = (env, argv) => {

    let config = null;

    if (argv.mode === 'development') {
        console.log("development")
        config = require('./webpack.config.dev');
    }else{
        config = require('./webpack.config.prod');
    }

    console.log("config",config);

    return config;
};