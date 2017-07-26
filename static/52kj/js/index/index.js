/**=============================================================
 *                                                         首页js代码
 * =============================================================
 */

define(function(require, exports, module) {

    require('jquery');
    require('String');
    var PK10Extensions = require('Pk10Extensions');
    var Jsk3Extensions = require('Jsk3Extensions');
    var Gdkl10Extensions = require('Gdkl10Extensions');
    var CqsscExtensions = require('CqsscExtensions');
    /** 调用公共库 */
    var publicObject = require('../public/index.js');
    /**  多页面调用的复用代码 */
    var common = require('../common/index')
    var worker = new Worker('../../../static/52kj/js/public/worker.js');
    var object = {};
    var Event = require('Event');
    var _this = this;
    _this.clientAwardTime = new Date();
    _this.awardTimeCount = 0;
    /**
     * 初始化函数;
     * @param：
     */
    object.init = function() {
        tickWatch();
        common.multiplexing();
        this.initAwardInfo();
        this.initAd();
        Event.on('adCallBack', function(data) {
            var adContainer = $("#app_swiperContainer");
            var adTopList = [];
            if (data != null && data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].code == "index_banner") {
                        for (var j = 0; j < data[i].data.length; j++) {
                            adTopList.push('<li><a href="' + data[i].data[j].url + '" target="_blank" rel="nofollow"><img src="' + data[i].data[j].image + '" alt=""/></a></li>');
                        }
                        adContainer.html(adTopList.join(''));
                        if (adTopList.length > 1) {
                            /** 初始化广告轮播图 */
                            publicObject.initSwiper($('#app_swiperContainer'), 3000);
                        }

                    } else if (data[i].code == "index_text") {
                        for (var j = 0; j < data[i].data.length; j++) {
                            $("#adcontent_" + (j + 1)).html('<a href="' + data[i].data[j].url + '" target="_blank" rel="nofollow">' + data[i].data[j].name + '</a>');
                            $("#ad_" + (j + 1)).show();
                        }
                    }
                }
            }
        });

    }

    object.initAd = function() {
        publicObject.getAdList("index_banner,index_text");
    };
    object.initAwardInfo = function() {
        publicObject.createLoading($('#loading'));
        var maxTimeInterval = 0;
        $.ajax({
            url: '/home/getAllAwardData',
            dataType: 'json',
            type: 'GET',
            success: function(result) {
                if (result) {
                    for (var i = 0; i < result.length; i++) {

                        var awardData = result[i].awardData;
                        bindAwardInfo(result[i].lotteryCode, awardData, 0);
                        awardInterval(result[i].lotteryCode, awardData.next.awardTimeInterval, awardData.next.delayTimeInterval);
                        if (awardData.next.delayTimeInterval > maxTimeInterval) {
                            maxTimeInterval = awardData.next.delayTimeInterval;
                        }
                    }
                    if (maxTimeInterval > 0) {
                        //浏览器开奖时间
                        _this.awardTimeCount = maxTimeInterval;
                    }
                }
                publicObject.deleteLoading($('#loading'));
            }
        });
    };

    function bindAwardInfo(code, awardData, type) {
        var awardDataArr = [];
        var awardNumber = awardData.current.awardNumbers.split(',');
        if (type == 0 || code == "pk10") {
            $("#period_" + code).html(awardData.current.periodNumber);
        } else {
            $("#period_" + code).html(new Date(awardData.current.awardTime.replace(/-/g, "/")).format('YYYYMMdd') + awardData.current.periodNumber.toString().zfill(3));
        }
        switch (code) {
            case "pk10":
                for (var i = 0; i < awardNumber.length; i++) {
                    awardDataArr.push('<li><span class="num' + awardNumber[i] + '"></span></li>');
                }
                var longHuArr = PK10Extensions.LongHu(awardNumber);
                var longHuHtmlArr = [];
                for (var i = 0; i < longHuArr.length; i++) {
                    longHuHtmlArr.push('<span>' + longHuArr[i] + '</span>');
                }
                longHuHtmlArr.push('<span>|</span><span>冠亚和:</span>');
                longHuHtmlArr.push('<span>' + PK10Extensions.ChampionRunnerupTotal(awardNumber) + '</span>');
                longHuHtmlArr.push('<span>' + PK10Extensions.ChampionRunnerupTotalBigOrSmall(awardNumber) + '</span>');
                longHuHtmlArr.push('<span>' + PK10Extensions.ChampionRunnerupTotalOddOrEven(awardNumber) + '</span>');
                $("#lotteryInfo_" + code).html(longHuHtmlArr.join(' '));
                break;
            case "cqssc":
                for (var i = 0; i < awardNumber.length; i++) {
                    awardDataArr.push('<li><span>' + awardNumber[i] + '</span></li>');
                }
                var longHuArr = CqsscExtensions.LongHu(awardNumber);
                var longHuHtmlArr = [];
                for (var i = 0; i < longHuArr.length; i++) {
                    longHuHtmlArr.push('<span>' + longHuArr[i] + '</span>');
                }
                longHuHtmlArr.push('<span>|</span><span>总和:</span>');
                longHuHtmlArr.push('<span>' + CqsscExtensions.NumbersTotal(awardNumber) + '</span>');
                longHuHtmlArr.push('<span>' + CqsscExtensions.NumbersTotalBigOrSmall(awardNumber) + '</span>');
                longHuHtmlArr.push('<span>' + CqsscExtensions.NumbersTotalOddOrEven(awardNumber) + '</span>');
                $("#lotteryInfo_" + code).html(longHuHtmlArr.join(' '));
                break;
            case "jsk3":
                for (var i = 0; i < awardNumber.length; i++) {
                    awardDataArr.push('<li><span class="num' + parseInt(awardNumber[i]) + '"></span></li>');
                }
                var longHuHtmlArr = [];
                longHuHtmlArr.push('<span>总和:</span>');
                longHuHtmlArr.push('<span>' + Jsk3Extensions.NumbersTotal(awardNumber) + '</span>');
                longHuHtmlArr.push('<span>' + Jsk3Extensions.NumbersTotalBigOrSmall(awardNumber) + '</span>');
                longHuHtmlArr.push('<span>' + Jsk3Extensions.NumbersTotalEvenOrOdd(awardNumber) + '</span>');
                $("#lotteryInfo_" + code).html(longHuHtmlArr.join(' '));
                break;
            case "xync":
                for (var i = 0; i < awardNumber.length; i++) {
                    awardDataArr.push('<li><span class="num' + parseInt(awardNumber[i]) + '"></span></li>');
                }
                var longHuHtmlArr = [];
                longHuHtmlArr.push('<span>总和:</span>');
                longHuHtmlArr.push('<span>' + Jsk3Extensions.NumbersTotal(awardNumber) + '</span>');
                longHuHtmlArr.push('<span>' + Jsk3Extensions.NumbersTotalBigOrSmall(awardNumber) + '</span>');
                longHuHtmlArr.push('<span>' + Jsk3Extensions.NumbersTotalEvenOrOdd(awardNumber) + '</span>');
                $("#lotteryInfo_" + code).html(longHuHtmlArr.join(' '));
                break;
            case "gdkl10":
                for (var i = 0; i < awardNumber.length; i++) {
                    awardDataArr.push('<li><span>' + awardNumber[i] + '</span></li>');
                }
                var longHuArr = Gdkl10Extensions.LongHu(awardNumber);
                var longHuHtmlArr = [];
                for (var i = 0; i < longHuArr.length; i++) {
                    longHuHtmlArr.push('<span>' + longHuArr[i] + '</span>');
                }
                longHuHtmlArr.push('<span>|</span><span>总和:</span>');
                longHuHtmlArr.push('<span>' + Gdkl10Extensions.NumbersTotal(awardNumber) + '</span>');
                longHuHtmlArr.push('<span>' + Gdkl10Extensions.NumbersTotalBigOrSmall(awardNumber) + '</span>');
                longHuHtmlArr.push('<span>' + Gdkl10Extensions.NumbersTotalOddOrEven(awardNumber) + '</span>');
                longHuHtmlArr.push('<span>' + Gdkl10Extensions.GetTotalMantissaBigOrSmall(awardNumber) + '</span>');
                $("#lotteryInfo_" + code).html(longHuHtmlArr.join(' '));
                break;
        }
        $("#lotteryData_" + code).html(awardDataArr.join(''));
    }

    function bindOneHigh(code) {
        $.ajax({
            url: '/' + code + '/getAwardTimes',
            dataType: 'json',
            type: 'GET',
            success: function(result) {
                if (result) {
                    var awardData = result;
                    if (awardData.next.awardTimeInterval > 0) {
                        bindAwardInfo(code, awardData, 1);
                    }
                    awardInterval(code, awardData.next.awardTimeInterval, awardData.next.delayTimeInterval);
                }
            }
        });
    }
    //时间监控，防止浏览器缓存页面数据
    function tickWatch() {
        // setInterval(function() {
        //     //计数器慢超过3秒， 届新页面
        //     if (new Date().getTime() - _this.clientAwardTime.getTime() > 3000) {
        //         //alert('计数器慢超过3秒， 届新页面');               
        //         window.location.reload();
        //     }
        //     _this.clientAwardTime = new Date();
        // }, 1000);
    }
    worker.addEventListener("message", function(evt) {
        var data = evt.data;
        var timeObj = $("#awardData_" + data.code);
        if (data.time == 0) {

            timeObj.html('<i>正在开奖中</i>');
            var timeout = setTimeout(function() {
                bindOneHigh(data.code);
            }, timeouts);
        } else {
            timeObj.attr("time", data.time);
            timeObj.html("距下期开奖<i>" + (data.time).toString().SecondsFomartTime() + "</i>");
        }
    });

    function awardInterval(code, time, delay) {
        //开奖直播倒计时obj呈现时间对象，code彩种，time倒计时间
        var downtimer = "timer_" + code;
        var sleeptimer = "sleep_" + code;
        time = time / 1000;
        var randomNum = Math.random() * 5;
        var timeouts = delay * 1000 + parseInt(randomNum, 10) * 1000;
        var timeData = { time: time, code: code };
        worker.postMessage(timeData);
        // downtimer = window.setInterval(function() {
        //     var timeObj = $("#awardData_" + code);

        //     if (time < 1) {
        //         if (downtimer) {
        //             window.clearInterval(downtimer);
        //         }
        //         timeObj.html('<i>正在开奖中</i>');
        //         var timeout = setTimeout(function() {
        //             bindOneHigh(code);
        //             if (timeout) {
        //                 clearTimeout(timeout);
        //             }
        //         }, timeouts);
        //     } else {
        //         var vtime = time--;
        //         _this.awardTimeCount--;
        //         $("#awardData_" + code).attr("time", vtime);

        //         timeObj.html("距下期开奖<i>" + (vtime).toString().SecondsFomartTime() + "</i>");
        //     }

        // }, 1000);
    }

    module.exports = object; //直接把整个模块对象导出;
})