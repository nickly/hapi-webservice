import { BaseController } from './base.controller';
import { Gdkl10Service } from '../services/gdkl10.service';


const colors = ["gray", "red", "purple", "soil", "blue", "green", "orange", "brown", "darkPurple"];

const getColor = (number) => {
    let arr = [];
    for (let i = 0, len = number.length; i < len; i++) {
        arr.push({ "text": number[i], "color": colors[i + 1] });
    }
    return arr;
};


const lotteryName = "广东快乐10分";
const lotteryCode = "gdkl10";
const _page = {
    default: "history",
    items: [
        { text: "历史开奖", url: "history" },
        { text: "单双大小路珠", url: "bigorsmall" },
        { text: "总和路珠", url: "totallz" }
    ]
}
//  { text: "推荐计划", url: "betgame" }



let _context = {
    get day() { return (new Date()).format('MM/dd') },
    get now() { return new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate() },
    code: lotteryCode,
    page: _page,
    data: {}
}

const resultHandle = function (data) {
    if (data && data.Result) {
        data = data.Result;
    }
    else {
        data = null;
    }
    return data;
}

export class Gdkl10Controller extends BaseController {
    constructor(endpoint) {
        super(endpoint);
        this.gdkl10Service = new Gdkl10Service();
        this.title = lotteryName;
        this.defaultAction = 'history';
    }

    history(request, reply) {
        _page.default = "history";
        _context.seo = null;
        return this.gdkl10Service.history().then((data) => {
            data = resultHandle(data);
            _context.data = {
                screen: {
                    numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
                    twoSide: ["单", "双","大", "小"]
                },
                history: data,
                frist: data ? getColor(data[0].OpenCodeList) : []
            };
            this.render(_context, request, reply);
        });
    }


    bigorsmall(request, reply) {
        _page.default = "bigorsmall";
        _context.seo = null;
        return this.gdkl10Service.luZhuBigOrSmall().then((data) => {
            _context.data = resultHandle(data); 
            this.render(_context, request, reply);
        });
    }

    totallz(request, reply) {
        _page.default = "totallz";
        _context.seo = null;
        return this.gdkl10Service.luzhuTotal().then((data) => {
            _context.data = resultHandle(data);
            this.render(_context, request, reply);
        });
    }

    betgame(request, reply) {
        _page.default = "betgame";
        _context.seo = null;
        return this.gdkl10Service.betGame().then((data) => { 
            _context.data =resultHandle(data);
            this.render(_context, request, reply);
        });
    }

    /**
     * 开奖直播
     */
    // video(request, reply) {
    //     return this.gdkl10Service.history().then((data) => {
    //         _context.data = {
    //             day: (new Date()).format('MM/dd'),
    //             history: data.Result,
    //             frist: getColor(data.Result[0].OpenCodeList)
    //         };
    //         this.render(_context, request, reply);
    //     })
    // }


    getHistory(request, reply) {
        return this.gdkl10Service.history(request.query.date).then((data) => {

            this.html(`${lotteryCode}/template/history`, {
                data: {
                    history: data.Result,
                    frist: getColor(data.Result[0].OpenCodeList),
                }
            }, request, reply);
        });
    }

    getBigOrSmall(request, reply) {
        return this.gdkl10Service.luZhuBigOrSmall(request.query.date).then((data) => {
            this.html(`partials/_luzhu`, {
                data: data.Result
            }, request, reply);
        });
    }

    getTotalLz(request, reply) {
        return this.gdkl10Service.luzhuTotal(request.query.date).then((data) => {
            this.html(`partials/_luzhu`, {
                data: data.Result
            }, request, reply);
        });
    }

    getBetGame(request, reply) {
        return this.gdkl10Service.betGame().then((data) => {
            this.html(`${lotteryCode}/template/betGame`, {
                data: data.Result
            }, request, reply);
        });
    }


    getAwardData(request, reply) {
        return this.gdkl10Service.getAwardData().then((result) => {
            this.json(result.Result, request, reply);
        });
    }

    getAwardTimes(request, reply) {
        return this.gdkl10Service.getAwardTimes().then(result => {
            this.json(result.Result, request, reply);
        });
    }


    luzhutest(request, reply) {
        _page.default = "";
        return new Promise((resolve, reject) => {
            return this.render(_context, request, reply);
        }).catch(function (error) {
            console.log("error:" + error)
        });
    }




    // todaystat(request, reply) {
    //     _page.default = "todaystat";
    //     return Promise.all([this.gdkl10Service.getAwardTimes(), this.gdkl10Service.getOpenCodeAnalysis()]).then(([awardData, analysis]) => {
    //         let award = JSON.parse(awardData.Result).next;
    //         const colors=[{
    //                     min:15,max:100, color: "ff0000"
    //                 },{
    //                   min:0,max:0,  color: "0000ff"
    //                 },{
    //                     min:0,max:0, color: "008000"
    //                 }];
    //         let context = {
    //             lotteryName,
    //             data: {
    //                 number: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    //                 ball: ["一", "二", "三", "四", "五", "六", "七", "八"],
    //                 colors,
    //                 stringColors:JSON.stringify(colors),
    //                 analysis: analysis.Result,
    //                 lottery: {
    //                     config: true,
    //                     code: lotteryCode,
    //                     day: (new Date()).format('MM/dd'),
    //                     awardPeriod: award.periodNumber,
    //                     awardTime: award.awardTimeInterval
    //                 },
    //                 page: _page
    //             }
    //         };
    //         this.render(context, request, reply);
    //     });
    // } 

}