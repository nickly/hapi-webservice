'use strict';
module.exports = {
    server: {
        port: process.env.HTTP_PORT || 8000,
        router: {
            stripTrailingSlash: true,
        },
        routes: {
            cors: true,
        },
    },
    node: {
        debugPort: 5858,
    },
    plugins: ["blipp", "good", "inert", "vision"],

    //udp日志接入配置
    udpLogConfig: {
        isSend: process.env.LOGGER_IS_SEND,
        remoteHost: process.env.LOGGER_UDP_IP,
        port: process.env.LOGGER_UDP_PORT
    },

    logConfig: {
        appenders: [
            { type: 'console' },
            {
                type: 'dateFile',
                filename: 'logs/log.log',
                pattern: "_yyyy-MM-dd",
                maxLogSize: 104800,
                alwaysIncludePattern: false,
                backups: 4,
                // category: 'logFile'
            },

        ],
        replaceConsole: true,
        level: 'debug'

    }
}