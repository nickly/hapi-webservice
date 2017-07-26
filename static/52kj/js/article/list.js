/**
 * Created by Administrator on 2017/5/23.
 */

/**=============================================================
 *        文章列表
 * =============================================================
 */

define(function (require, exports, module) {

    require('jquery');
    /** 调用公共库 */
    var publicObject = require('public/index');
    /**  多页面调用的复用代码 */
    var common = require('common/index');

    var exprotObj = {};


    /**
     * 初始化函数;
     * @param：
     */
    exprotObj.init = function () {

        common.multiplexing();
        this.article_list();
    }
    var article_page = 1;
    exprotObj.article_list = function () {
        $(".app_active_more").click(function () {
            article_page++;
            publicObject.createLoading($('#loading'));
            $.get('/article/getlist?sumId='+sumId+'&page='+article_page, function(html) {
                console.log(html);
                $(".app_active_more").before(html);
                /** 滚动方法 */
                //publicObject.swiperForTable($("#data-result"),600, false);
                publicObject.deleteLoading($('#loading'));
            });
        });
    }
    module.exports = exprotObj;   //直接把整个模块对象导出;
});

