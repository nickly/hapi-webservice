/**=============================================================
 * 通用倒计时
 * 依赖 <span class="header_text"><i>距---期开奖：</i><b>--:--</b></span>
 * zhangh
 * =============================================================
 */

define(function (require, exports, module) {

    require('jquery');

    //var publicObject = require('public/index');

    var exprotObj = {};

    var _this = this;
    _this.awarding = false;
    _this.awardTimeCount = 0;
    _this.nextPeriod = 0;
    _this.lotteryCode = null;
    _this.awardWait = 10; //延时秒
    _this.AwardDataDelay = 2000;
    _this.clientAwardTime = null;
    _this.reloading = false;

    timerAwardData = function (interval, next) {
        window.setInterval(function () {
            if (_this.awarding && _this.awardTimeCount + _this.awardWait < 0) {
                $.get("/" + _this.lotteryCode + "/getawarddata", function (result) {
                    if (result.current.period == _this.nextPeriod) {
                        _this.awarding = false;
                        getAwardTime();//重新获取时间
                        next(result);
                    }
                });
            }

        }, interval);
    }

    timerCountDown = function (next) {
        window.setInterval(function () {

            /*
            var tempTime = new Date().getTime() + _this.awardTimeCount * 1000;
            //计数器慢超过3秒， 刷新页面
            if (!_this.reloading && (tempTime - _this.clientAwardTime.getTime() > 3000)) {
                _this.reloading = true;
                window.location.reload();
                //getAwardTime();//重新获取时间
            }*/


            if (_this.awardTimeCount <= 0) {
                _this.awarding = true;
                $('.header_text b').html("开奖中");
            } else {
                $('.header_text b').html(('' + _this.awardTimeCount).SecondsTommss());
            }

            _this.awardTimeCount--;
        }, 1000);
    }

    getAwardTime = function (next) {
        $.get("/" + _this.lotteryCode + "/getawardtimes", function (result) {

            _this.awardTimeCount = result.next.awardTimeInterval / 1000;
            _this.nextPeriod = result.next.periodNumber;
            //浏览器开奖时间
            _this.clientAwardTime = new Date(new Date().getTime() + result.next.awardTimeInterval);
            _this.reloading = false;
            //console.log("开奖中时间" + _this.clientAwardTime)

            var periodText = _this.nextPeriod + "";
            if (periodText.length < 3) {//不够3位补0
                periodText = periodText.replace(/\d+/g, function (m) {
                    return "00".substr(m.length - 1) + m;
                });
            }

            $(".header_text i").html("距" + periodText + "期开奖：");

            if (next)
                next(result);
        });
    }


    exprotObj.start = function (lotteryCode, next) {

        _this.lotteryCode = lotteryCode;

        getAwardTime(function () {
            timerCountDown(next);
            timerAwardData(_this.AwardDataDelay, next);
        });
    }


    module.exports = exprotObj;   //直接把整个模块对象导出;
});
