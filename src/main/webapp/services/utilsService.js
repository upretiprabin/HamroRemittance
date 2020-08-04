import log from '../services/loggerService'

export const middleWareUrlResolver = (domain,devUrl)=>{
    log.info("Environment:"+process.env.NODE_ENV);

    if(location.origin.includes("localhost") || location.origin.includes("127.0.0.1"))
        return devUrl;

    let url = location.origin;
    log.info("Middleware URL:"+url);
    return url;
};
