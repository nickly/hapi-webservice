/**=============================================================
 *                                                         幸运农场历史开奖js代码
 * =============================================================
 */

define(function(require, exports, module) {

    require('Array')
    var exprotObj = {};
    /**
     * 初始化函数;
     * @param：
     */
    exprotObj.init = function(obj) {
        var _this = obj || this;

        _this.historySetNumColor();
        _this.bindEvent();
    }

    /**
     * 设置号码颜色;
     * @param：
     */
    exprotObj.historySetNumColor = function() {
        /***************************设置号码颜色Start**************************** */
        var hitColor = {};
        $(".app_lottery_gdklsf:first i").each(function(i) {
            var numStyle = ['red', 'purple', 'soil', 'blue', 'green', 'orange', 'brown', 'darkPurple'];
            var hit = $(this).text();
            hitColor[hit] = numStyle[i];
        });

        $(".app_lottery_gdklsf i").each(function() {
            var hit = $(this).text();
            $(this).removeAttr("class");
            $(this).addClass(hitColor[hit] || 'gray');
        });
        /***************************设置号码颜色End**************************** */
        // //清除筛选选中
        // $('span[data-query]').removeClass('active');
    }


    /**
     * 绑定事件;
     * @param：
     */
    exprotObj.bindEvent = function() {
        var _this = this;
        //号码筛选与两面筛选按钮事件
        $('span[data-query]').click(function() {
            var queryVal = $(this).attr('data-query');
            var recovery = $(".app_table_requirement ul li:last-child span");
            //恢复列表
            if (queryVal === 'hf') {
                $('#historyList').find('.active').removeClass('active');
                $('span[data-query]').removeClass('active');
                recovery.removeClass("fontOrange");
            } else {
                if ($(this).is('.active')) {
                    $(this).removeClass('active');
                    var count = $(".app_table_requirement li span.active").length;
                    if (count == 0) {
                        recovery.removeClass("fontOrange");
                    }
                } else {
                    //判断是否是两面按钮
                    if (isNaN(queryVal)) {
                        switch ($(this).attr('data-query-val')) {
                            case "d":
                                //选择“单” 需移除“双”按钮的选中
                                $('span[data-query-val="s"]').removeClass("active");
                                break;
                            case "s":
                                //选择“双” 需移除“单”按钮的选中
                                $('span[data-query-val="d"]').removeClass("active");
                                break;
                            case "da":
                                //选择“大” 需移除“小”按钮的选中
                                $('span[data-query-val="x"]').removeClass("active");
                                break;
                            case "x":
                                //选择“小” 需移除“大”按钮的选中
                                $('span[data-query-val="da"]').removeClass("active");
                                break;
                        }
                    }

                    $(this).addClass('active');
                    recovery.addClass("fontOrange");
                }
                _this.filterList();
            }
        });
    }

    /**
     * 筛选控制列表号码;
     * @param：
     */
    exprotObj.filterList = function() {
        //两面数据分类
        var tsData = {
            "d": [1, 3, 5, 7, 9, 11, 13, 15, 17, 19], //单
            "s": [2, 4, 6, 8, 10, 12, 14, 16, 18, 20], //双
            "x": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], //小
            "da": [11, 12, 13, 14, 15, 16, 17, 18, 19, 20], //大
            "dda": [11, 13, 15, 17, 19], //单大
            "dad": [11, 13, 15, 17, 19], //大单
            "dx": [1, 3, 5, 7, 9], //单小
            "xd": [1, 3, 5, 7, 9], //小单
            "sda": [12, 14, 16, 18, 20], //双大
            "das": [12, 14, 16, 18, 20], //大双
            "sx": [2, 4, 6, 8, 10], //双小
            "xs": [2, 4, 6, 8, 10] //小双
        }

        //存储用户筛选操作选中的号码 与两面
        var querys = [];
        //循环遍历筛选项，号码直接添加到querys数组。两面按钮  单双选中的与大小选中的合并添加到querys数组（方便下面判断号码是属于哪中类型的两面）
        $('span[data-query][class="active"]').each(function(index, item) {
            var q = $(item).attr('data-query');
            if (isNaN(q)) {
                var qv = $(item).attr('data-query-val');
                querys["type"] = (querys["type"] || "") + qv;
            } else {
                querys.push(q);
            }

        })

        var newQueryList = $('[data-type="historyList"]').clone(true);
        //遍历历史列表
        newQueryList.each(function(index, item) {
            var nums = $(item).find('.app_lottery_gdklsf').eq(0);
            //遍历历史开奖每期的号码
            nums.children().each(function(cindex, number) {
                nums.children().eq(cindex).removeClass('active')
                var numberVal = parseInt($(number).text());

                //判断当前号码是否包含在用户筛选的数组中
                if (querys.Contains(numberVal)) {
                    nums.children().eq(cindex).addClass('active');
                }
                //判断两面类型数据
                if (querys["type"] != null) {
                    if (tsData[querys["type"]].Contains(numberVal)) {
                        nums.children().eq(cindex).addClass('active');
                    }
                }
            });
            newQueryList.eq(index).find('.app_lottery_gdklsf').html(nums.html());
        });
        $('#historyList').html(newQueryList);
    }


    /**
     * 倒计时结束 开奖结果插入到列表中;
     * 如果
     * @param：开奖数据
     */
    exprotObj.atInsertResult = function(data) {
        var current = data.current;
        var date = $("#date").val();
        if (date === current.date) {
            var nums = current.award.split(',');
            var time = current.time;
            var strDay = current.date.replace('-', '').replace('-', '');
            var period = current.period;
            var $tr = $('<tr data-type="historyList"><td></td><td></td><td><div class="app_lottery_gdklsf"></div></td></tr>');
            $tr.find('td').eq(0).html(strDay + "-" + period);
            $tr.find('td').eq(1).html(time);
            for (var i = 0; i < nums.length; i++) {
                var num = nums[i];
                var $i = $('<i></i>').html(parseInt(num));
                $tr.find('.app_lottery_gdklsf').append($i);
            }
            $("#historyList").prepend($tr);
        }
    }
    module.exports = exprotObj; //直接把整个模块对象导出;
});