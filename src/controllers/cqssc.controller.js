import { BaseController } from './base.controller';
import { CqsscService } from '../services/cqssc.service';
import logger from '../services/logger.service';

/**
 * 重庆时时彩
 */
export class CqsscController extends BaseController {

  /**
   * Constructor
   */
  constructor(endpoint) {

    super(endpoint);
    this.cqsscService = new CqsscService();
    this.defaultAction = 'history';
    this.lotteryCode = 'cqssc';
    this.title = "重庆时时彩";
  }


  /**
   * 开奖历史
   * @param {*} request 
   * @param {*} reply 
   */
  history(request, reply) {
  

    // try {
    //   throw Error("测试出错日志");
    // } catch (e) {
    //   //console.log(request.headers["user-agent"]);  
    //   logger.error("错误", e, request);
    // }

    //跳转
    //return this.redirect('http://cqssc/getawarddata', request, reply);

    return this.cqsscService.history(request.query.date).then((json) => {

      let lottery = { code: this.lotteryCode, day: (new Date()).format('MM/dd') };
      let context = { historyList: json.Result, lottery, dateOption: true };

      this.render(context, request, reply);
    });
  }

  getHistory(request, reply) {
    return this.cqsscService.history(request.query.date).then((json) => {
      let context = { historyList: json.Result };
      this.html(`${this.lotteryCode}/template/history`, context, request, reply);
    });

  }

  /**
   * 大小单双路珠
   * @param {*} request 
   * @param {*} reply 
   */
  bigorsmall(request, reply) {

    return this.cqsscService.luZhuBigOrSmall(request.query.date).then(json => {

      let lottery = { code: this.lotteryCode, day: (new Date()).format('MM/dd'), condion: true, };
      let context = {
        data: json.Result, lottery,
        balls: ['第一球', '第二球', '第三球', '第四球', '第五球'],
        selectText: { ballText: '全部球号', twoSided: '全部双面' },
        dateOption: true
      };


      this.render(context, request, reply);
    });

  }

  /**
   * 今日号码统计
   */
  todayStat(request, reply) {
    return this.cqsscService.openCodeAnalysis().then(json => {
      let context = { result: json.Result };
      this.render(context, request, reply);
    });

  }

  /**冷热码分析 */
  hotcold(request, reply) {

    return this.cqsscService.hotColdNumber().then(json => {
      let context = { result: json.Result };
      this.render(context, request, reply);
    });

  }


  /**推荐计划 */
  betgame(request, reply) {

    return this.cqsscService.betgame().then(json => {
      let context = { result: json.Result };
      this.render(context, request, reply);
    });

  }




  /**开奖直播 */
  video(request, reply) {

    return this.cqsscService.history().then((json) => {

      let context = { historyList: json.Result };

      this.render(context, request, reply);
    });

  }

  /**历史号码统计 */
  numberStat(request, reply) {

    return this.cqsscService.numberStat().then((json) => {

      let context = { result: json.Result };
      this.render(context, request, reply);
    });
  }


  getAwardTimes(request, reply) {
    return this.cqsscService.getAwardTimes().then(result => {
      this.json(result.Result, request, reply);
    });
  }

  /**
   * 开奖数据
   */
  getAwardData(request, reply) {

    return this.cqsscService.getAwardData().then((result) => {
      this.json(result.Result, request, reply);
    });
  }


  getbigorsmall(request, reply) {
    return this.cqsscService.luZhuBigOrSmall(request.query.date).then((data) => {

      this.html(`partials/_luzhu`,
        {
          data: data.Result
        }, request, reply);

    });
  }



}
