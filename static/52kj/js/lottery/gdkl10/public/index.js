"use strict";
define(function (require, exports, module) {

    var publicObj = require('public/index');
    var commonObj = require('common/index');
    var awardtimer = require('public/awardtimer');

    var obj = {};


    obj.init = function () {
        //初始化
        //publicObj.createLoading($('#loading'));//loding 

        if (document.getElementById("app_swiperSelect")) {
            publicObj.initHeaderSwiper($("#app_swiperSelect")); /** 初始化导航 */
            /**选中彩种*/
            publicObj.checkLotteryNav();
            //publicObj.moveHeader();
        } 
        commonObj.multiplexing();
    }



    /** 历史开奖---显示条件筛选 */
    obj.tableFilter = publicObj.tableFilter;


    var lotteryName = 'gdkl10';

    //开奖倒计时


    obj.countdownTime = function (callback) {
        awardtimer.start(lotteryName, function (result) {
            if (!obj._day || obj._day == result.current.date) {
                callback(result)
            }
        });
    }

    obj._day = null;
    //选择日期

    obj.selectDay = function (url, type, callback) {


        publicObj.createDateWindow($("#date"), type, function (day) {

            obj._day = day; //记录时间,

            obj.ajaxHtml(url, { date: day }, callback)

        });
    }


    obj.ajaxHtml = function (url, data, callback) {
        $.ajax({
            type: "GET",
            url: "/gdkl10/" + url,
            data: data,
            dataType: "html",

            success: function (data) {
                if (typeof callback == "function") {
                    callback(data);
                }
            },

            complete: function () {

            }
        })
    }


    /** 给每个路珠绑定滚动方法 */

    obj.lunzhuswiper = function () {


        $(".app_luZhu_list").each(function (index, item) {
            publicObj.swiperForTable($(item), 60);
        });

        publicObj.swiperForDoument();
    }

    module.exports = obj;

})



// /** 彩种名字 */
// var colorName = 'gdkl10';
// /** 时间倒计对象 */
// var headerText = $('.header_text i');
// var headerTime = $('.header_text b');
// /** 倒计时时间数 */
// var awardTime = parseInt(headerTime.attr('awardTime'));

// var currentPeriodNumber = -1;
// var timeInterval = 80000;
// var nextPeriodNumber = -1;
// //请求出错次数
// var errorCount = 0;
// //请求次数
// var requireCount = 0;

// var cpNumber=0;

// var countDownTimer;

// var bindAwardInfo = function (data) {
//     headerText.attr('awardPeriod', data.current.periodNumber);
//     headerText.html('距' + data.next.periodNumber + '期开奖：');
//     headerTime.attr('awardTime', data.next.awardTimeInterval);
// }



// var loadAwardTimesTimer, ctimeOfPeriod = -1;
// var cpCurrAwardData = null;
// var cpNextAwardTimeInterval = -1;
// var getAwardTime = function () {


//     $.ajax({
//         url: '/gdkl10/getAwardTimes',
//         type: 'GET',
//         dataType: "json",
//         success: function (data) {

//             //请求到数据后需要做的事情
//             cpCurrAwardData = data;

//             //期数不同，则开始封盘倒计时
//             if (data.current.periodNumber != cpNumber) {
//                 cpNextAwardTimeInterval = data.next.awardTimeInterval;


//                 if (countDownTimer) {
//                     window.clearInterval(countDownTimer)
//                 };

//                 countDownTimer = window.setInterval(function () {

//                     cpNextAwardTimeInterval = Math.max(0, cpNextAwardTimeInterval - 1000);

//                     headerTime.html(cpNextAwardTimeInterval.toString().SecondsFomartTime());

//                     bindAwardInfo(data);

//                 }, 1000);
//             }

//             cpNumber = data.current.periodNumber;
//             if (ctimeOfPeriod == -1) {//判断第一次加载
//                 ctimeOfPeriod = data.current.periodNumber;

//                 bindAwardInfo(data);
//             }





//             var leavePeriod = 84 - cpNumber;
//             if (leavePeriod == 0) {
//                 var d = new Date();
//                 var nd = new Date(data.next.awardTime.split(' ')[0].replace("-", "/", "gi"));
//                 if (d.getDate() == nd.getDate()) leavePeriod = 84;
//             }


//             loadAwardTimesTimer = window.setTimeout(loadAwardTimes, data.next.awardTimeInterval < 10 ? 10000 : data.next.awardTimeInterval + 1000);







//             // cpCurrAwardData = data;
//             // time = data.next.awardTimeInterval / 1000; 
//             // bindAwardInfo(data); 

//         },
//         error: function () {
//             if (errorCount < 20) {
//                 window.setTimeout(getAwardTime, 5000 + Math.random() * 10000);
//                 errorCount++;
//             }
//         }
//     })

// };



// var getAwardData = function () {
//     $.ajax({
//         url: '/gdkl10/getAwardData',
//         type: 'GET',
//         dataType: "json",
//         success: function (data) {
//             // errorCount = 0;
//             // if (cpCurrAwardData.next.periodNumber == data.current.period) {
//             //     if (callback(data)) {
//             //         getAwardTime();
//             //     }
//             // }

//             requireCount += 1;
//             if ((data.current.periodNumber != currentPeriodNumber) && currentPeriodNumber != -1) {
//                 timeInterval = 80000;
//                 // window.setTimeout(afterAwarded, 5000);
//                 // $(".currentAward .period").css("color", "green"); 

//                 requireCount = errorCount = 0;

//                 //hideLotPeriodNumWarn();
//             }
//             if (timeInterval != 0) {

//                 callback(data);

//                 // $(".currentAward .period").html(data.current.periodNumber + " 期");
//                 // var nums = data.current.awardNumbers.split(',');
//                 // var str = "";
//                 // for (var i = 0; i < nums.length; i++) {
//                 //     if (parseInt(nums[i]) > 18) {
//                 //         str = str + "<span class='red'>" + nums[i] + "</span>";
//                 //     }
//                 //     else {
//                 //         str = str + "<span class='no" + nums[i] + "'>" + nums[i] + "</span>";
//                 //     }
//                 // }
//                 // $(".lot-nums").html(str);
//                 // if (currentPeriodNumber == -1) {
//                 //     $(".currentAward .period").css("color", "green");
//                 // }


//                 if (currentPeriodNumber == -1) {    //判断第一次加载
//                     currentPeriodNumber = data.current.periodNumber;

//                 }
//                 currentPeriodNumber = data.current.periodNumber;
//                 nextPeriodNumber = data.next.periodNumber;
//             }
//             var _time = parseInt(parseInt(data.next.awardTimeInterval) + timeInterval + parseInt(Math.random() * 15000));
//             window.setTimeout(getAwardData, data.next.awardTimeInterval < 10 ? 5000 : _time);
//             timeInterval = 0;

//         },
//         error: function () {
//             if (errorCount < 20) {
//                 window.setTimeout(getAwardData, 5000 + Math.random() * 10000);
//                 errorCount++;
//             }
//         }
//     })
// }

//window.setTimeout(getAwardData, 1000);
//每10秒刷新开奖时间数据
//loadAwardTimesTimer = window.setTimeout(getAwardTime, 1000);

// downtimer = window.setInterval(function () {
//     if (time < 1) {
//         if (cpCurrAwardData) {
//             headerTime.html('开奖中');
//             getAwardData();
//         }
//     } else {
//         var vtime = time--;
//         headerTime.attr('awardTime', vtime);
//         headerTime.html((vtime).toString().SecondsFomartTime());
//     }
//     //time = time - 10000;
// }, 1000);