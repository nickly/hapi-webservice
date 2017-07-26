
//import "isomorphic-fetch";
import { LotteryService } from './lottery.service'
import cacheService from './cache.service';
import logger from './logger.service';


/**
 * 江苏快三数据接口服务
 */
export class Jsk3Service extends LotteryService {

    constructor() {
        super();
        this.lotteryCode = 'jsk3';
    }

  /**
 * 历史号码统计
 */
    numberstat(){
        let cacheOpt = { key: `${this.lotteryCode}_numberstat`, expired: 3000 };
        let httpOpt = { url: `${this.lotteryCode}/numberstat` };
        return this.httpGet(httpOpt, cacheOpt);
    }

}