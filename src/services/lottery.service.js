//import "isomorphic-fetch";

//import request from 'request';
import rq from 'request-promise';

import { BaseService } from './base.service'
import cacheService from './cache.service';
import logger from './logger.service';

export class LotteryService extends BaseService {

    constructor() {
        super();
    }

    /**
     * 开奖数据
     */
    getAwardData() {

        let cacheOpt = { key: `${this.lotteryCode}_getawarddata`, expired: 0 }; //开奖数据暂时不缓存，expired设置0
        cacheOpt = {...cacheOpt, ...this.cacheSetting['getAwardData'] };

        const httpOpt = { url: `${this.lotteryCode}/getawarddata` };

        return this.httpGet(httpOpt, cacheOpt);
    }

    /**
     * 获取最新开奖
     */
    getNewestRecord() {

        let cacheOpt = { key: `${this.lotteryCode}_getNewestRecord`, expired: 3000 };
        cacheOpt = {...cacheOpt, ...this.cacheSetting['getNewestRecord'] };

        let httpOpt = { url: `${this.lotteryCode}/getnewestrecord` };
        return this.httpGet(httpOpt, cacheOpt);

    }


    /**
     * 获取开奖时间数据
     */
    getAwardTimes() {

        let cacheOpt = { key: `${this.lotteryCode}_getAwardTimes`, expired: 0 };
        cacheOpt = {...cacheOpt, ...this.cacheSetting['getAwardTimes'] };

        let httpOpt = { url: `${this.lotteryCode}/getawardtimes` };

        return this.httpGet(httpOpt, cacheOpt);
    }




    /**
     * 历史开奖
     */
    history(date) {

        let cacheOpt = { key: `${this.lotteryCode}_history`, expired: 3000 };
        cacheOpt = {...cacheOpt, ...this.cacheSetting['history'] };

        const httpOpt = { url: `${this.lotteryCode}/history` };

        if (date) {
            httpOpt.qs = { date: date }
            cacheOpt.key += `_${date}`;
        }

        return this.httpGet(httpOpt, cacheOpt);
    }




    /**
     * 单双大小路珠
     */
    luZhuBigOrSmall(date) {

        let cacheOpt = { key: `${this.lotteryCode}_LuZhuBigOrSmall`, expired: 3000 };
        cacheOpt = {...cacheOpt, ...this.cacheSetting['luZhuBigOrSmall'] };

        let httpOpt = { url: `${this.lotteryCode}/luzhubigorsmall` };

        if (date) {
            httpOpt.qs = { date: date }
            cacheOpt.key += `_${date}`;
        }

        return this.httpGet(httpOpt, cacheOpt).then(result => {
            return result;
        });

    }


    /**
     * 总和路珠
     */
    luzhuTotal(date) {

        let cacheOpt = { key: `${this.lotteryCode}_LuzhuTotal`, expired: 3000 };
        cacheOpt = {...cacheOpt, ...this.cacheSetting['luzhuTotal'] };

        let httpOpt = { url: `${this.lotteryCode}/luzhutotal` };

        if (date) {
            httpOpt.qs = { date: date }
            cacheOpt.key += `_${date}`;
        }

        return this.httpGet(httpOpt, cacheOpt);
    }

}