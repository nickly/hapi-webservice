import { BaseController } from './base.controller';
import { Pk10Service } from '../services/pk10.service';


const lotteryCode = "pk10";
const balls = ['冠军', '亚军', '第三名', '第四名', '第五名', '第六名', '第七名', '第八名', '第九名', '第十名'];
const robot = ['浩宇', '擎苍', '致远', '天佑', '骏驰', '烨磊', '文博', '旭尧', '睿渊', '哲瀚'];

export class Pk10Controller extends BaseController {
    constructor(endpoint) {
        super(endpoint);
        this.pk10Service = new Pk10Service();
        this.title = "北京赛车PK10";
        this.defaultAction = 'history';
        this.lottery = {
            hasdate: false, //日期
            condion: false, //筛选条件
            config: false, //设置
            day: (new Date()).format('MM/dd'),
            date: (new Date()).format('yyyy-MM-dd')
        }
    }
    /**
     * 开奖历史
     * @param {*} request 
     * @param {*} reply 
     */
    history(request, reply) {


        return this.pk10Service.history(request.query.date).then((result) => {
            let screen = {
                numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                bigAndSmall: ["大", "小"],
                singleAndDouble: ["单", "双"],
                recovery: ['恢复']
            }
            this.lottery.hasdate = true;
            this.lottery.config = false;

            let context = {
                lottery: this.lottery,
                screen: screen,
                historyList: result.Result,
            };

            this.render(context, request, reply);
        });

    }


    /**
     * 开奖历史--龙虎
     * @param {*} request
     * @param {*} reply
     */
    longhu(request, reply) {


        return this.pk10Service.history(request.query.date).then((result) => {

            this.lottery.hasdate = true;
            this.lottery.config = false;

            let context = {
                lottery: this.lottery,
                historyList: result.Result,
            };

            this.render(context, request, reply);
        });

    }


    /**
     *  获取历史开奖
     *  选择头部时间时候用于调用历史开奖模版;
     **/
    getHistory(request, reply) {
        return this.pk10Service.history(request.query.date).then((data) => {

            this.html(`${lotteryCode}/template/history`, {
                historyList: data.Result,
            }, request, reply);
        });
    }


    /**
     *  获取历史开奖---龙虎
     *  选择头部时间时候用于调用历史开奖模版;
     **/
    getLongHu(request, reply) {
        return this.pk10Service.history(request.query.date).then((data) => {

            this.html(`${lotteryCode}/template/longhu`, {
                historyList: data.Result,
            }, request, reply);
        });
    }


    /**
     * 开奖直播
     */
    video(request, reply) {
        return this.pk10Service.history().then((json) => {

            let context = { historyList: json.Result };
            this.render(context, request, reply);
        });
    }


    /**
     * 开奖数据
     */
    getAwardData(request, reply) {

        return this.pk10Service.getAwardData().then((result) => {

            this.json(result.Result, request, reply);

        });

    }

    /**
     * 大小单双路珠
     * @param {*} request 
     * @param {*} reply 
     */
    bigOrSmall(request, reply) {
        return this.pk10Service.luZhuBigOrSmall(request.query.date).then((result) => {

            this.lottery.hasdate = true;
            this.lottery.condion = true;
            this.lottery.config = false;

            let context = {
                lottery: this.lottery,
                balls: balls,
                selectText: { ballText: '全部车号', twoSided: '全部双面' },
                data: result.Result
            };

            this.render(context, request, reply);
        });

    }
    /**
     * 获取新一期开奖数据
     */
    getNewestRecord(request, reply) {

        return this.pk10Service.getNewestRecord().then(result => {
            this.json(result, request, reply);
        });


    }
    /**
     * 获取开奖时间数据
     */
    getAwardTimes(request, reply) {

        return this.pk10Service.getAwardTimes().then(result => {
            this.json(result.Result, request, reply);
        });


    }
    /**
     * 推荐计划（免费参考）
     */
    betGame(request, reply) {
        return this.pk10Service.betGame().then((result) => {

            this.lottery.hasdate = false;
            this.lottery.condion = false;
            this.lottery.config = false;

            let context = {
                lottery: this.lottery,
                data: result.Result
            };

            this.render(context, request, reply);
        });
    }
    /**
     * 今日号码统计
     */
    todayStat(request, reply) {
        return this.pk10Service.openCodeAnalysis().then((result) => {

            this.lottery.hasdate = false;
            this.lottery.condion = false;
            this.lottery.config = true;

            const colors = [{
                min: 15,
                max: 100,
                color: "ff0000"
            }, {
                min: 0,
                max: 0,
                color: "0000ff"
            }, {
                min: 0,
                max: 0,
                color: "008000"
            }];
            let context = {
                lottery: this.lottery,
                colors: colors,
                stringColors: JSON.stringify(colors),
                balls: balls,
                data: result.Result
            };

            this.render(context, request, reply);
        });
    }
    /**
     * 冠亚和路珠
     */
    guanYahe(request, reply) {
        return this.pk10Service.luZhuGuanyahe(request.query.date).then((result) => {

            this.lottery.hasdate = true;
            this.lottery.condion = false;
            this.lottery.config = false;

            let context = {
                lottery: this.lottery,
                data: result.Result
            };

            this.render(context, request, reply);
        });

    }
    /**
     * 冷热码分析
     */
    hotColdNumber(request, reply) {
        return this.pk10Service.hotColdNumber().then((result) => {

            this.lottery.hasdate = false;
            this.lottery.condion = false;
            this.lottery.config = false;

            let context = {
                lottery: this.lottery,
                data: result.Result
            };

            this.render(context, request, reply);
        });
    }
    /**
     * 龙虎历史
     */
    numberStat(request, reply) {
        return this.pk10Service.numberStat().then((result) => {

            this.lottery.hasdate = false;
            this.lottery.condion = false;
            this.lottery.config = false;

            let context = {
                lottery: this.lottery,
                data: result.Result
            };

            this.render(context, request, reply);
        });
    }
    /**
     * 杀号定胆
     */
    killNumber(request, reply) {

        return this.pk10Service.killNumber(request.query.count, request.query.ball).then((result) => {

            this.lottery.hasdate = false;
            this.lottery.condion = false;
            this.lottery.config = false;

            let context = {
                lottery: this.lottery,
                data: result.Result,
                balls: balls,
                robot: robot
            };

            this.render(context, request, reply);
        });

    }



    gethotcoldnumber(request, reply) {
        return this.pk10Service.hotColdNumber().then((data) => {

            this.html(`pk10/template/hotcoldnumber`, {
                data: data.Result
            }, request, reply);
        });
    }
    getnumberstat(request, reply) {
        return this.pk10Service.numberStat().then((data) => {

            this.html(`pk10/template/numberstat`, {
                data: data.Result
            }, request, reply);
        });
    }
    gettodaystat(request, reply) {
        return this.pk10Service.openCodeAnalysis().then((data) => {

            this.html(`pk10/template/todaystat`, {
                data: data.Result,
                balls: balls
            }, request, reply);
        });
    }
    getbetgame(request, reply) {
        return this.pk10Service.betGame().then((data) => {

            this.html(`pk10/template/betgame`, {
                data: data.Result
            }, request, reply);
        });
    }
    getbigorsmall(request, reply) {
        return this.pk10Service.luZhuBigOrSmall(request.query.date).then((data) => {

            this.html(`partials/_luzhu`, {
                data: data.Result
            }, request, reply);
        });
    }
    getguanyahe(request, reply) {
        return this.pk10Service.luZhuGuanyahe(request.query.date).then((data) => {

            this.html(`partials/_luzhu`, {
                data: data.Result
            }, request, reply);
        });
    }

    getkillnumber(request, reply) {
        return this.pk10Service.killNumber(request.query.count, request.query.ball).then((data) => {

            this.html(`pk10/template/killnumber`, {
                data: data.Result,
                robot: robot
            }, request, reply);
        });
    }
}