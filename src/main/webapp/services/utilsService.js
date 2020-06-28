import log from '../services/loggerService'

export const middleWareUrlResolver = (domain,devUrl)=>{
    log.info("Environment:"+process.env.NODE_ENV);

    if(location.origin.includes("localhost"))
        return devUrl;

    domain = "."+domain;
    let middlewareUrlToken = "middleware";
    let urlTokens = location.origin.split(domain);
    let url = urlTokens[0]+"-"+middlewareUrlToken+domain;
    log.info("Middleware URL:"+url);
    return url;
};
