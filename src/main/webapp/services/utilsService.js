import log from '../services/loggerService'

export const middleWareUrlResolver = ()=>{
    log.info("Environment:"+process.env.NODE_ENV);
    let url = location.origin;
    log.info("Middleware URL:"+url);
    return url;
};
