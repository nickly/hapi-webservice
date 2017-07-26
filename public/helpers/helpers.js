'use strict';

module.exports = function(Handlebars) {

    Handlebars.registerHelper('iDateTime', function(time) {
        return time.DateFormat('hh:mm');
    });

    Handlebars.registerHelper('iDate', function(time) {
        return time.DateFormat('YYYY-MM-dd');
    });

    // Handlebars.registerHelper('odd', function (i, t, f) {
    // 	return i % 2 ? t : f;
    // });

    Handlebars.registerHelper('interlaced', function(rowIndx, interval, right, error) {
        return rowIndx % interval ? right : error;
    });


    ///operator 运算符（lt 小于，le 小于等于 eq 等于 gt  大于 ge 大于等于 cn 包含  ）
    ///options 选项
    Handlebars.registerHelper('ifExt', function(v1, v2, operator, options) {


        let t = false;
        switch (operator) {
            case "noeq":
                {
                    t = v1 != v2;
                };
                break;
            case "lt":
                {
                    t = v1 < v2;
                };
                break;
            case "le":
                {
                    t = v1 <= v2;
                };
                break;
            case "eq":
                {
                    t = v1 == v2;
                };
                break;
            case "gt":
                {
                    t = v1 > v2;
                };
                break;
            case "ge":
                {
                    t = v1 >= v2;
                };
                break;
            case "cn":
                {
                    t = v1.indexOf(v2) > -1;
                };
                break;
        }
        //console.log(v1+','+v2+','+t);
        if (t) {
            //满足添加继续执行
            return options.fn(this);
        } else {
            //不满足条件执行{{else}}部分
            return options.inverse(this);
        }

    });
    /*
     * 求和
     */
    Handlebars.registerHelper('sum', function() {
        var sum = 0;
        if (arguments) {
            for (var i = 0; i < arguments.length - 1; i++) {
                sum += parseInt(arguments[i]);
            }
        }
        return sum;
    });
    /*
     * 转百分比
     */
    Handlebars.registerHelper('percent', function(v1, num) {
        return (parseFloat(v1) * 100).toFixed(num);
    });

    Handlebars.registerHelper('numberColor', function(source, data) {
        let len = source.length,
            color = "gray";
        for (let j = 0; j < len; j++) {
            if (source[j].text === data) {
                color = source[j].color;
                break;
            }
        }
        return color;
    });


    /* 
     *截取字符串
     */
    Handlebars.registerHelper('subString', function(source, length) {
        if (source != null && source.length > 0) {
            source = source.replace(/<[^>]+>/g, ""); //去掉所有的html标记
            if (source.length > length) {
                return source.substring(0, length) + "...";
            }
        }
        return source;
    });

    Handlebars.registerHelper({
        todaystatNumberColor: function(number, rangeColors, defaultColor) {
            if (rangeColors) {
                for (let i = 0, len = rangeColors.length; i < len; i++) {
                    if (rangeColors[i].min == 0 || rangeColors[i].max == 0) {
                        return defaultColor;
                    }

                    if (number >= rangeColors[i].min && number <= rangeColors[i].max) {
                        return rangeColors[i].color;
                    }
                }
            } else {
                return defaultColor;
            }
        },
        toHtml: function(data, options) {
            return new Handlebars.SafeString(data)
        }
    });

    /**
     * 快三类彩种 总和大小判断
     */
    Handlebars.registerHelper('k3SumBS', function(nums) {
        if (nums.length != 3) return '--';
        else if (nums[0] == nums[1] && nums[1] == nums[2]) {
            return '通吃';
        } else {
            let sum = nums[0] + nums[1] + nums[2];
            if (sum > 10) {
                return '大';
            } else {
                return '小';
            }
        }
    });

    /**
     * 快三类彩种 总和大小文字样式
     */
    Handlebars.registerHelper('k3SumBSTextCss', function(nums) {
        if (nums.length != 3) return '';
        else if (nums[0] == nums[1] && nums[1] == nums[2]) {
            return '';
        } else {
            let sum = nums[0] + nums[1] + nums[2];
            if (sum > 10) {
                return 'red';
            } else {
                return '';
            }
        }
    });
}