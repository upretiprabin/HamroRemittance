import loglevel from 'loglevel';

loglevel.enableAll();

function plain(log) {
    return `[${log.timestamp}] ${log.level}: ${log.message}${log.stacktrace ? `\n${log.stacktrace}` : ''}`;
}

const getLogObj = (level,message,reqObj)=>({
    timestamp : new Date().toISOString(),
    level : level,
    message : (reqObj ? message + " URL:"+reqObj.url+" DATA:"+JSON.stringify(reqObj.config?.data) : message)
});

const info = (log,reqObj = null) => loglevel.info(plain(getLogObj('INFO',log,reqObj)));

const warn = (log,reqObj = null) => loglevel.warn(plain(getLogObj('WARN',log,reqObj)));

const debug = (log,reqObj = null) => loglevel.debug(plain(getLogObj('DEBUG',log,reqObj)));

const trace = (log,reqObj = null) => loglevel.trace(plain(getLogObj('TRACE',log,reqObj)));

const error = (log,reqObj = null) => loglevel.error(plain(getLogObj('ERROR',log,reqObj)));



export default {
    info,
    warn,
    debug,
    trace,
    error
};