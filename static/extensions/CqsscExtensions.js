define(function(require, exports, module) {

    var CqsscExtensions = {};
    //龙虎
    CqsscExtensions.LongHu = function(numbers) {
        var n1 = parseInt(numbers[0]);
        var n2 = parseInt(numbers[4]);
        if (n1 > n2) {
            return "龍";
        } else if (n1 < n2) {
            return "虎";
        } else {
            return "和";
        }
    };
    //总和
    CqsscExtensions.NumbersTotal = function(numbers) {
        var result = 0;
        for (var i = 0; i < numbers.length; i++) {
            result += parseInt(numbers[i]);
        }
        return result;
    };
    /// 返回单或双
    CqsscExtensions.NumbersTotalOddOrEven = function(numbers) {
        return CqsscExtensions.GetNumberOddOrEven(CqsscExtensions.NumbersTotal(numbers));
    };
    /// 传入一个号码，返回号码单或双
    CqsscExtensions.GetNumberOddOrEven = function(total) {
        if (parseInt(total) % 2 == 0) {
            return "双";
        } else {
            return "单";
        }
    };
    /// 传入总和，返回大或小
    CqsscExtensions.GetTotalBigOrSamll = function(total) {
        if (parseInt(total) > 22) {
            return "大";
        } else {
            return "小";
        }
    };
    /// 大小
    CqsscExtensions.NumbersTotalBigOrSmall = function(numbers) {
        return CqsscExtensions.GetTotalBigOrSamll(CqsscExtensions.NumbersTotal(numbers));
    };
    module.exports = CqsscExtensions;
})