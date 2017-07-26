import log4js from 'log4js';
import serverConfig from '../../config/server';
import dgram from 'dgram';


const loggerService = new class LoggerService {

    constructor() {

        this._udpSock = dgram.createSocket('udp4');
        this._host = serverConfig.udpLogConfig.remoteHost || null;
        this._port = serverConfig.udpLogConfig.port || null;
        // console.log(this._host);
        log4js.configure(serverConfig.logConfig);

        this.logger = log4js.getLogger();
        this.logger.setLevel(serverConfig.logConfig.level);
    }

    _udpSend(msg) {

        //console.log(serverConfig.udpLogConfig.port);
        if (!serverConfig.udpLogConfig.isSend)
            return;


        const buff = new Buffer(msg); //消息
        //console.log(msg);
        this._udpSock.send(buff, 0, buff.length, this._port, this._host, (err) => {
            if (err) {

                this.error(`log4js.logPlainUDPAppender error sending to ${host}:${port}, error: `, err);
            }
        });

    }

    _wrapMsg(msg, ex, request, level) {

        request = request || {};
        request.info = request.info || {};
        request.headers = request.headers || {};
        ex = ex || {};

        let log = {
            date: new Date().format('yyyy-MM-dd hh:mm:ss'),
            level,
            msg,
            url: request.path || '',
            http_host: request.info.host || '',
            exception: ex.stack || '',

            REMOTE_ADDR: request.info.remoteAddress || '',
            REQUEST_METHOD: request.headers["REQUEST_METHOD"] || '',
            HTTP_HOST: request.headers["HTTP_HOST"] || '',
            HTTP_X_FORWARDED_FOR: request.headers["HTTP_X_FORWARDED_FOR"] || '',
            HTTP_X_RAW_URL: request.headers["HTTP_X_RAW_URL"] || '',
            HTTP_REFERER: request.headers["Referer"] || '',
            //QUERY_STRING: request.query,
        };

        const logText = `
>>Project: SEO-M
>>Time: ${log.date}
>>Level: ${log.level}
>>Message: ${log.msg}
>>Url: ${log.url}
>>Url-Method: ${log.REQUEST_METHOD}
>>REMOTE_ADDR: ${log.REMOTE_ADDR}
>>HTTP_HOST:  ${log.HTTP_HOST}
>>HTTP_X_FORWARDED_FOR: ${log.HTTP_X_FORWARDED_FOR}
>>HTTP_X_RAW_URL: ${log.HTTP_X_RAW_URL}
>>HTTP_REFERER: ${log.HTTP_REFERER}
>>Exception: ${log.exception}`;
        //>>QUERY_STRING: ${log.QUERY_STRING}`

        return logText;
    }


    debug(msg, ex, request) {
        this.logger.debug(msg);
    }


    info(msg, ex, request) {
        try {

            this._udpSend(this._wrapMsg(msg, ex, request, 'info'));
            this.logger.info(msg);

        } catch (ex) {
            this.logger.info(msg);
        }

    }

    warn(msg, ex, request) {
        this.logger.warn(msg);
    }

    /**
     * 错误级日志
     */
    error(msg, ex, request) {

        try {

            this._udpSend(this._wrapMsg(msg, ex, request, 'error'));
            this.logger.error(msg);

        } catch (ex) {
            this.logger.error(`记录日志错误:${ex.stack}`);
        }
    }

}();

export default loggerService;