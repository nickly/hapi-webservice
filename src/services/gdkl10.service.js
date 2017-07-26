import { LotteryService } from './lottery.service'
import cacheService from './cache.service';
import logger from './logger.service';


export class Gdkl10Service extends LotteryService {

    constructor() {
        super();
        this.lotteryCode = 'gdkl10';
    } 
    
    //  getOpenCodeAnalysis() { 
    //     let cacheOpt = { key: `${this.lotteryCode}_getOpenCodeAnalysis`, expired: 5000 };
    //     cacheOpt = {...cacheOpt, ...this.cacheSetting['getOpenCodeAnalysis'] };

    //     const httpOpt = { url: `${this.lotteryCode}/OpenCodeAnalysis` };

    //     return this.httpGet(httpOpt, cacheOpt);
    // } 

    betGame() {
        let cacheOpt = { key: `${this.lotteryCode}_betGame`, expired: 3000 };
        cacheOpt = {...cacheOpt, ...this.cacheSetting['betGame'] };


        let httpOpt = { url: `${this.lotteryCode}/betGame` };
        return this.httpGet(httpOpt, cacheOpt);
    }
}