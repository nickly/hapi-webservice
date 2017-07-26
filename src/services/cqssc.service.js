
import { LotteryService } from './lottery.service'
import cacheService from './cache.service';
import logger from './logger.service';


/**
 * 重庆时时彩数据接口服务
 */
export class CqsscService extends LotteryService {

    constructor() {
        super();

        this.lotteryCode = 'cqssc';

        //特殊设置缓存时间
        //this.cacheSetting['history'] = { expired: 6000 };
    }

    /**
 * 今日号码统计
 */
    openCodeAnalysis() {

        let cacheOpt = { key: `${this.lotteryCode}_openCodeAnalysis`, expired: 3000 };
        let httpOpt = { url: `${this.lotteryCode}/opencodeanalysis` };
        return this.httpGet(httpOpt, cacheOpt);
    }

    /**
     * 冷热球分析
     */
    hotColdNumber() {
        let cacheOpt = { key: `${this.lotteryCode}_hotColdNumber`, expired: 3000 };
        let httpOpt = { url: `${this.lotteryCode}/hotcoldnumber` };
        return this.httpGet(httpOpt, cacheOpt);
    }


    /**推荐计划 */
    betgame() {

        let cacheOpt = { key: `${this.lotteryCode}_betgame`, expired: 3000 };
        let httpOpt = { url: `${this.lotteryCode}/betgame` };
        return this.httpGet(httpOpt, cacheOpt);
    }

    /**历史统计 */
    numberStat() {
        let cacheOpt = { key: `${this.lotteryCode}_numberstat`, expired: 3000 };
        let httpOpt = { url: `${this.lotteryCode}/numberstat` };
        return this.httpGet(httpOpt, cacheOpt);
    }


}