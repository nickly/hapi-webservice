import { BaseController } from './base.controller';
import { XyncService } from '../services/xync.service';

export class XyncController extends BaseController {
    constructor(endpoint) {
        super(endpoint);
        this.title = "幸运农场";
        this.xyncService = new XyncService();
        this.defaultAction = 'history';
    }

    /**
     * 获取最新开奖
     */
    getNewestRecord(request, reply) {
        return this.xyncService.getNewestRecord().then(result => {
            this.json(result, request, reply);
        });
    }

    /**
     * 获取开奖时间数据
     */
    getAwardTimes(request, reply) {
        return this.xyncService.getAwardTimes().then(result => {
            this.json(result.Result, request, reply);
        });
    }


    /**
     * 开奖数据和下期开奖时间
     */
    getAwardData(request, reply) {
        return this.xyncService.getAwardData().then(result => {
            this.json(result.Result, request, reply);
        });
    }

    /**
     * 历史开奖
     */
    history(request, reply) {
        return this.xyncService.history(request.query.date).then((data) => {
            let header = {
                showDate: true,
                ymd: (new Date()).format('yyyy-MM-dd'),
                md: (new Date()).format('MM/dd'),
                hm: (new Date()).format('hh/mm')
            };
            let context = { historyList: data.Result, Header: header }
            this.render(context, request, reply);
        })
    }

    /**
     * 单双大小路珠
     */
    bigorsmall(request, reply) {

        return this.xyncService.luZhuBigOrSmall(request.query.date).then((data) => {
            let header = {
                showDate: true,
                ymd: (new Date()).format('yyyy-MM-dd'),
                md: (new Date()).format('MM/dd'),
                hm: (new Date()).format('hh/mm')
            };
            let context = { data: data.Result, Header: header }
            this.render(context, request, reply);
        })
    }

    /**
     * 获取单双大小路珠
     */
    getbigorsmall(request, reply) {

        return this.cqsscService.luZhuBigOrSmall(request.query.date).then((data) => {
            this.html(`partials/_luzhu`, {
                data: data.Result
            }, request, reply);
        });
    }

    /**
     * 总和路珠
     */
    total(request, reply) {
        return this.xyncService.luzhuTotal(request.query.date).then((data) => {
            let header = {
                showDate: true,
                ymd: (new Date()).format('yyyy-MM-dd'),
                md: (new Date()).format('MM/dd'),
                hm: (new Date()).format('hh/mm')
            };
            let context = { data: data.Result, Header: header }
            this.render(context, request, reply);
        })
    }

    /**
     * 免费参考
     */
    betGame(request, reply) {
        return this.xyncService.betGame(request.query.date).then((data) => {
            let header = {
                showDate: false,
                ymd: (new Date()).format('yyyy-MM-dd'),
                md: (new Date()).format('MM/dd'),
                hm: (new Date()).format('hh/mm')
            };
            let context = { Model: data.Result, Header: header }
            this.render(context, request, reply);
        })
    }

    /**
     * 开奖直播
     */
    video(request, reply) {
        return this.xyncService.history(request.query.date).then((data) => {
            let context = {
                Model: data.Result
            }

            this.render(context, request, reply);
        })
    }
}