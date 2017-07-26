//import "isomorphic-fetch";

//import request from 'request';
import rp from 'request-promise';
import cacheService from './cache.service';
import logger from './logger.service';
import config from './config.service';



//rp.debug = true;

export class BaseService {

    constructor() {
        this.cacheSetting = {};
    }

    /***
     * 尝试在缓存中找回数据
     * @param {api 请求设置} httpOpt 
     * @param {缓存设置，可选， 不为空时查找缓存} cacheOpt 
     */
    httpGet(httpOpt, cacheOpt) {
        if (cacheOpt) {

            let fromCache = cacheService.get(cacheOpt);

            if (fromCache) {
                logger.debug(`命中cache-${cacheOpt.key}`);
                return Promise.resolve(fromCache);
            }
        }
        let nodeEnv = ((process.env.NODE_ENV || 'development'));
        let defaultApiOptions = {};
        if (nodeEnv == "development") {
            defaultApiOptions = {
                baseUrl: config.app.api.uri.development,
                json: true,
                gzip: true,
                jar: true,
                timeout: 10000,
                resolveWithFullResponse: true,
                headers: {
                    'User-Agent': 'Request-Promise'
                }
            };
        } else {
            defaultApiOptions = {
                baseUrl: ((process.env.VERSION || 'beta') == 'beta' ? config.app.api.uri.beta : config.app.api.uri.release),
                json: true,
                gzip: true,
                jar: true,
                timeout: 10000,
                resolveWithFullResponse: true,
                headers: {
                    'User-Agent': 'Request-Promise',
                    'HOST': _headers.host,
                    'X-HOST': _headers["X-HOST"]
                }
            };
        }
        let options = { ...defaultApiOptions, ...httpOpt };
        //logger.info(`Api接口参数:${options}`);
        logger.debug(`Api-URL:${options.baseUrl}${options.url}`);

        return rp(options).then((result) => {
            if (cacheOpt && cacheOpt.expired > 0 && result && result.body) {
                cacheService.set(cacheOpt, result.body);
            }

            return result.body;
        });

        // return rp(options).then(function(response) {
        //     if (!response.error && response.statusCode == 200) {
        //         return response.body;
        //     }
        //     // return null;
        // });
        // .catch(function(res) {
        //     logger.debug(res);
        //     return null;
        // });

    }

}