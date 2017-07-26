import { BaseController } from './base.controller';
import { Jsk3Service } from '../services/jsk3.service';

const lotteryName = "江苏快三";
const lotteryCode = "jsk3";

export class Jsk3Controller extends BaseController {
    constructor(endpoint) {
        super(endpoint);
        this.jsk3Service = new Jsk3Service();
        this.title = "江苏快3";
        this.defaultAction = 'history';
    }

    /**
     * 开奖数据
     */
    getAwardData(request, reply) {

        return this.jsk3Service.getAwardData().then((result) => {
            this.json(result.Result, request, reply);

        });
    }

    getNewestRecord(request, reply) {
        return this.jsk3Service.getNewestRecord().then(result => {
            this.json(result, request, reply);
        });
    }

    /**
     * 开奖时间
     */
    getAwardTimes(request, reply) {

        return this.jsk3Service.getAwardTimes().then(result => {
            this.json(result.Result, request, reply);
        });
    }

    history(request, reply) {
        return this.jsk3Service.history().then((result1) => {
            let context = {
                lottery: {
                    hasdate: true,
                    day: (new Date()).format('MM/dd')
                },
                historyList: result1.Result
            };

            this.render(context, request, reply);
        });

    }

    getHistory(request, reply) {
        return this.jsk3Service.history(request.query.date).then((data) => {
            this.html(`${lotteryCode}/template/history`, {
                historyList: data.Result,
            }, request, reply);
        });
    }

    numberstat(request, reply) {
        return this.jsk3Service.numberstat().then((data) => {
            let context = {
                lottery: {
                    hasdate: false,
                    day: (new Date()).format('MM/dd'),
                },
                dataList: data.Result
            };

            this.render(context, request, reply);
        });
    }

    getnumberstat(request, reply) {
        return this.jsk3Service.numberstat().then(data => {
            if (data.Result && data.Result.length > 0) {
                let result = data.Result[0];
                let stat = {
                    date: new Date(result.StatDate).format('YYYY-MM-dd'),
                    stats: [result.Num1, result.Num2, result.Num3, result.Num4, result.Num5, result.Num6, result.Big, result.Small]
                };
                this.json(stat, request, reply);
            } else {
                this.json({}, request, reply);
            }
        });
    }

    /**
     * 总和路珠
     */
    luzhuTotal(request, reply) {
        return this.jsk3Service.luzhuTotal().then((luzhu) => {
            let context = {
                lottery: {
                    hasdate: true,
                    condion: false,
                    day: (new Date()).format('MM/dd')
                },
                data: luzhu.Result
            };

            this.render(context, request, reply);
        });

    }

    /**
     * 视频直播
     */
    video(request, reply) {
        return this.jsk3Service.history(request.query.date).then((data) => {
            let context = { historyList: data.Result }
            this.render(context, request, reply);
        })
    }


    getluzhutotal(request, reply) {
        return this.jsk3Service.luzhuTotal(request.query.date).then((data) => {

            this.html(`partials/_luzhu`, {
                data: data.Result
            }, request, reply);
        });
    }


    /**
     * 免费参考
     */
    betGame(request, reply) {}
}