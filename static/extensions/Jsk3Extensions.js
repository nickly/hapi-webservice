define(function(require, exports, module) {

    var Jsk3Extensions = {};
    //总和
    Jsk3Extensions.NumbersTotal = function(numbers) {
        var result = 0;
        for (var i = 0; i < numbers.length; i++) {
            result += parseInt(numbers[i]);
        }
        return result;
    };
    /// 总和大或小
    Jsk3Extensions.NumbersTotalBigOrSmall = function(numbers) {
        if (parseInt(numbers[0]) == parseInt(numbers[1]) && parseInt(numbers[1]) == parseInt(numbers[2])) {
            return "通吃";
        }
        return Jsk3Extensions.GetTotalBigOrSamll(Jsk3Extensions.NumbersTotal(numbers));
    };
    Jsk3Extensions.NumbersTotalEvenOrOdd = function(numbers) {
        if (parseInt(numbers[0]) == parseInt(numbers[1]) && parseInt(numbers[1]) == parseInt(numbers[2])) {
            return "通吃";
        }
        return Jsk3Extensions.GetTotalEvenOrOdd(Jsk3Extensions.NumbersTotal(numbers));
    };
    /// 传入总和，返回大或小
    Jsk3Extensions.GetTotalBigOrSamll = function(total) {
        if (parseInt(total) > 10) {
            return "大";
        } else {
            return "小";
        }
    };
    Jsk3Extensions.GetTotalEvenOrOdd = function(total) {
        if (parseInt(total) % 2 == 0) {
            return "双";
        } else {
            return "单";
        }
    };
    module.exports = Jsk3Extensions;
});