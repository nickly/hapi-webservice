//import "isomorphic-fetch";

//import request from 'request';
import rq from 'request-promise';

import { BaseService } from './base.service'
import cacheService from './cache.service';
import logger from './logger.service';
import config from './config.service';

export class AdService extends BaseService {

    constructor() {
        super();
    }

    /**
     * 获取广告数据
     */
    getAdList(codes) {

        let debugPlatform = (process.env.NODE_ENV || 'development');
        let releasePlatform = (process.env.VERSION || 'beta');
        //console.log('广告站点ID:' + process.env.AD_WEBSITE);
        const website = process.env.AD_WEBSITE;
        if (website) {
            let cacheOpt = { key: `getAddList`, expired: 30000 }; //开奖数据暂时不缓存，expired设置0
            cacheOpt = {...cacheOpt, ...this.cacheSetting['getAdList'] };
            cacheOpt.key += `_${website}_${codes}`;
            //console.log('广告站点ID:' + cacheOpt.key);
            const httpOpt = { baseUrl: '', qs: { codes: codes, website: website, format: 'json', jsoncallback: 'AdCallBackList' }, url: (debugPlatform == 'development' ? config.app.api.ad.url.development : (releasePlatform == 'beta' ? config.app.api.ad.url.beta : config.app.api.ad.url.release)), headers: { 'User-Agent': 'Request-Promise' } };
            return this.httpGet(httpOpt, cacheOpt);
        } else {
            return Promise.resolve(null);
        }
    }

}