import { LotteryService } from './lottery.service'
import cacheService from './cache.service';
import logger from './logger.service';


export class Pk10Service extends LotteryService {

    constructor() {
        super();
        this.lotteryCode = 'pk10';
    } 

    /**
     * 今日号码统计
     */
    openCodeAnalysis() {

        let cacheOpt = { key: `${this.lotteryCode}_openCodeAnalysis`, expired: 3000 };
        cacheOpt = { ...cacheOpt, ...this.cacheSetting['openCodeAnalysis'] };

        let httpOpt = { url: `${this.lotteryCode}/opencodeanalysis` };
        return this.httpGet(httpOpt, cacheOpt);
    }


    /**
     * 免费参考
     */
    betGame() {


        let cacheOpt = { key: `${this.lotteryCode}_betGame`, expired: 3000 };
        cacheOpt = { ...cacheOpt, ...this.cacheSetting['betGame'] };

        let httpOpt = { url: `${this.lotteryCode}/betgame` };
        return this.httpGet(httpOpt, cacheOpt);
    }

    /**
     * 冠亚和路珠
     */
    luZhuGuanyahe(date) {

        let cacheOpt = { key: `${this.lotteryCode}_luZhuGuanyahe`, expired: 3000 };
        cacheOpt = { ...cacheOpt, ...this.cacheSetting['luZhuGuanyahe'] };

        let httpOpt = { url: `${this.lotteryCode}/luzhuguanyahe` };

        if (date) {
            httpOpt.qs = { date: date }
            cacheOpt.key += `_${date}`;
        }

        return this.httpGet(httpOpt, cacheOpt);
    }

    /**
     * 热温冷号码
     */
    hotColdNumber() {

        let cacheOpt = { key: `${this.lotteryCode}_hotColdNumber`, expired: 3000 };
        cacheOpt = { ...cacheOpt, ...this.cacheSetting['hotColdNumber'] };

        let httpOpt = { url: `${this.lotteryCode}/hotcoldnumber` };
        return this.httpGet(httpOpt, cacheOpt);
    }


    /**
     * 龙虎历史
     */
    numberStat() {

        let cacheOpt = { key: `${this.lotteryCode}_numberStat`, expired: 3000 };
        cacheOpt = { ...cacheOpt, ...this.cacheSetting['numberStat'] };

        let httpOpt = { url: `${this.lotteryCode}/numberstat` };
        return this.httpGet(httpOpt, cacheOpt);
    }
    /**
     * 杀号定胆
     */
    killNumber(count,ball) {

       if(!count){
            count=20;  
       }
       if(!ball){
            ball=1;
       }

        let cacheOpt = { key: `${this.lotteryCode}_killNumber`, expired: 3000 };
        cacheOpt = { ...cacheOpt, ...this.cacheSetting['killNumber'] };

        let httpOpt = { url: `${this.lotteryCode}/killnumber` };

        if (count && ball) {
            httpOpt.qs = { count:count,ball:ball }
            cacheOpt.key += `_${count}_${ball}`;
        }else if(count){
            httpOpt.qs = { count:count }
            cacheOpt.key += `_${count}`;
        }else if(ball){
            httpOpt.qs = { ball:ball }
            cacheOpt.key += `_${ball}`;
        }

        return this.httpGet(httpOpt, cacheOpt);
    }
}
   
