import { LotteryService } from './lottery.service'
import cacheService from './cache.service';
import logger from './logger.service';


export class XyncService extends LotteryService {

    constructor() {
        super();
        this.lotteryCode = 'xync';
    }

    /**
     * 免费参考
     */
    betGame() {
        let cacheOpt = { key: `${this.lotteryCode}_betGame`, expired: 3000 };
        cacheOpt = {...cacheOpt, ...this.cacheSetting['betGame'] };


        let httpOpt = { uri: `${this.lotteryCode}/betGame` };
        return this.httpGet(httpOpt, cacheOpt);
    }
}