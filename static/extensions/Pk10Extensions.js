define(function(require, exports, module) {

    var PK10Extensions = {};
    //龙虎
    PK10Extensions.LongHu = function(numbers) {
        var longhu = ["龍", "龍", "龍", "龍", "龍"];
        var num1 = parseInt(numbers[0]);
        var num2 = parseInt(numbers[1]);
        var num3 = parseInt(numbers[2]);
        var num4 = parseInt(numbers[3]);
        var num5 = parseInt(numbers[4]);
        var num6 = parseInt(numbers[5]);
        var num7 = parseInt(numbers[6]);
        var num8 = parseInt(numbers[7]);
        var num9 = parseInt(numbers[8]);
        var num10 = parseInt(numbers[9]);
        if (num1 < num10) {
            longhu[0] = "虎";
        }
        if (num2 < num9) {
            longhu[1] = "虎";
        }
        if (num3 < num8) {
            longhu[2] = "虎";
        }
        if (num4 < num7) {
            longhu[3] = "虎";
        }
        if (num5 < num6) {
            longhu[4] = "虎";
        }
        return longhu;
    };
    //冠亚和
    PK10Extensions.ChampionRunnerupTotal = function(numbers) {
        return parseInt(numbers[0]) + parseInt(numbers[1]);
    };
    /// 传入PK10冠亚和，返回大或小
    PK10Extensions.GetGYHBigOrSamll = function(total) {
        if (total > 11) {
            return "大";
        } else {
            return "小";
        }
    };
    /// 传入一个号码，返回号码单或双
    PK10Extensions.GetNumberOddOrEven = function(total) {
        if (total % 2 == 0) {
            return "双";
        } else {
            return "单";
        }
    };
    /// pk10冠亚和大小
    PK10Extensions.ChampionRunnerupTotalBigOrSmall = function(numbers) {
        return PK10Extensions.GetGYHBigOrSamll(PK10Extensions.ChampionRunnerupTotal(numbers));
    };
    /// pk10冠亚和单双
    PK10Extensions.ChampionRunnerupTotalOddOrEven = function(numbers) {
        return PK10Extensions.GetNumberOddOrEven(PK10Extensions.ChampionRunnerupTotal(numbers));
    };
    module.exports = PK10Extensions;
});