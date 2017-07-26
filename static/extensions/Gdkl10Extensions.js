define(function(require, exports, module) {

    var Gdkl10Extensions = {};
    //龙虎
    Gdkl10Extensions.LongHu = function(numbers) {
        var longhu = ["龍", "龍", "龍", "龍"];
        var num1 = parseInt(numbers[0]);
        var num2 = parseInt(numbers[1]);
        var num3 = parseInt(numbers[2]);
        var num4 = parseInt(numbers[3]);
        var num5 = parseInt(numbers[4]);
        var num6 = parseInt(numbers[5]);
        var num7 = parseInt(numbers[6]);
        var num8 = parseInt(numbers[7]);
        if (num1 < num8) {
            longhu[0] = "虎";
        }
        if (num2 < num7) {
            longhu[1] = "虎";
        }
        if (num3 < num6) {
            longhu[2] = "虎";
        }
        if (num4 < num5) {
            longhu[3] = "虎";
        }
        return longhu;
    };
    /// 返回总和尾大尾小
    Gdkl10Extensions.GetTotalMantissaBigOrSmall = function(numbers) {
        var total = Gdkl10Extensions.NumbersTotal(numbers);
        var mantissa = parseInt(total.toString().substr(total.toString().length - 1, 1));
        if (mantissa > 4) {
            return "尾大";
        } else {
            return "尾小";
        }
    };
    //总和
    Gdkl10Extensions.NumbersTotal = function(numbers) {
        var result = 0;
        for (var i = 0; i < numbers.length; i++) {
            result += parseInt(numbers[i]);
        }
        return result;
    };
    /// 传入一个号码，返回号码单或双
    Gdkl10Extensions.GetNumberOddOrEven = function(total) {
        if (parseInt(total) % 2 == 0) {
            return "双";
        } else {
            return "单";
        }
    };
    Gdkl10Extensions.GetTotalBigOrSamll = function(total) {
        if (parseInt(total) <= 83) {
            return "小";
        } else if (total >= 85) {
            return "大";
        }
        return "和";
    };
    Gdkl10Extensions.NumbersTotalOddOrEven = function(numbers) {
        return Gdkl10Extensions.GetNumberOddOrEven(Gdkl10Extensions.NumbersTotal(numbers));
    };
    Gdkl10Extensions.NumbersTotalBigOrSmall = function(numbers) {
        return Gdkl10Extensions.GetTotalBigOrSamll(Gdkl10Extensions.NumbersTotal(numbers));
    };
    module.exports = Gdkl10Extensions;
});