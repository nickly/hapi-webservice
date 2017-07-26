seajs.use(['lottery/gdkl10/public/index', "Date"], function (index, dateObj) {
    $(document).ready(function () {
        index.init();

        //index.lunzhuswiper();/** 给每个路珠绑定滚动方法 */ 

        var children = false;
        new AlloyFinger(".app_luZhu_Scope", {
            touchMove: function (evt) {
                if (!children) {
                    if (Math.abs(evt.deltaX) >= Math.abs(evt.deltaY)) {
                        evt.preventDefault();
                        evt.stopPropagation();
                    }
                }
            },
            tap: function (evt) {
                children = false;
            },
            cancel: function (evt) {
                children = false;
            }
        }) 

        $(".app_luZhu_Block").each(function (index, item) {

            

            new AlloyFinger(item, {
                touchStart: function (evt) {
                    children = true;
                },
                touchMove: function (evt) {
                    if (children) {
                        if (Math.abs(evt.deltaX) < Math.abs(evt.deltaY)) {
                            children = false;
                        }
                    }
                },
                touchEnd: function (evt) {
                    children = false;
                },
                tap: function (evt) {
                    children = false;
                },
                cancel: function (evt) {
                    children = false;
                }
            });
        })


        //日期选择 
        index.selectDay("getbigorsmall", 2, function (data) {
            $(".app_luZhu_Scope").html(data);
            index.lunzhuswiper();
        });


        //筛选
        var titleDivs = document.querySelectorAll("#app_selectBlockNav .app_selectBlockNav_uls .app_selectBlockNav_lis");
        var texts = document.querySelectorAll("#app_selectBlockNav .content");
        var ul = document.querySelectorAll(".app_selectBlockNavCons ul");
        var number_lis = $(ul[0]).find("li");
        var type_lis = $(ul[1]).find("li");
        var number_active_li = number_lis.last();
        var type_active_li = type_lis.last();
        var temp_li = null, isActive = false, code = "", condition = "", i = 0, regexp = new RegExp(/(全部球号|全部两面)/g);
        var ele;
        $(ul).click(function (event) {
            ele = event.target;
            if (ele.tagName == "SPAN") {
                isActive = $(ele).parent().hasClass("active");
                code = ele.innerText.indexOf('球') > -1 ? "ball" : "type";
                if (!isActive) {
                    if (code == "ball") {
                        temp_li = number_lis;
                        number_active_li = $(ele).parent();
                        i = 0;
                    }
                    else {
                        temp_li = type_lis;
                        type_active_li = $(ele).parent();
                        i = 1;
                    }

                    texts[i].innerHTML = ele.innerText + "<i></i>";


                    temp_li.removeClass("active");
                    temp_li = $(ele).parent();
                    temp_li.addClass("active");

                    condition = $.trim(number_active_li[0].innerText);
                    condition += $.trim(type_active_li[0].innerText);
                    condition = condition.replace(regexp, '');
                    if (condition == "") {
                        $(".app_luZhu_Scope .app_luZhu_Block").show();
                    }
                    else {
                        $(".app_luZhu_Scope .app_luZhu_Block").hide();
                        $(".app_luZhu_Scope .app_luZhu_Block[data-attr*='" + condition + "']").show();
                    }

                    titleDivs[i].click();
                }
            }
        })

        //开奖倒计时回调 
        index.countdownTime(function (data) {
            //var a=$(".app_luZhu_Block .app_luZhu_list table tr td:last-child");  
            index.ajaxHtml("getbigorsmall", {}, function (html) {
                $(".app_luZhu_Scope").html(html);
                if (condition == "") {
                    $(".app_luZhu_Scope .app_luZhu_Block").show();
                }
                else {
                    $(".app_luZhu_Scope .app_luZhu_Block").hide();
                    $(".app_luZhu_Scope .app_luZhu_Block[data-attr*='" + condition + "']").show();
                }
                index.lunzhuswiper();
            });
        });
    })
})



        // $(".app_selectBlockNavCons ul").click(function (evente) {
        //     event = event || window.event;
        //     var ele = event.srcElement ? event.srcElement : event.target;
        //     if (ele.tagName == "SPAN") { 
        //         var isActive = $(ele).parent().hasClass("active");
        //         var code = $(ele).parent().parent()[0].getAttribute("data-code");
        //         var text = ele.innerText;
        //         var temp_lis = code == "ball" ? number_lis : type_lis;
        //         var lis_len = code == "ball" ? 9 : 3;

        //         if (text == "全部") {
        //             temp_lis.removeClass("active");
        //         }
        //         else {
        //             temp_lis.last().removeClass("active");
        //         }

        //         if (isActive) {
        //             $(ele).parent().removeClass("active");
        //         }
        //         else {
        //             $(ele).parent().addClass("active");
        //             if ((lis_len - 1) == $(temp_lis).filter(".active").size()) {
        //                 temp_lis.removeClass("active");
        //                 temp_lis.last().addClass("active");
        //             }
        //         }

        //         //处理
        //         var data = [[], []];
        //         $(number_lis).filter(".active").each(function (i, item) {
        //             data[0].push($(item).text());
        //         });
        //         $(type_lis).filter(".active").each(function (i, item) {
        //             data[1].push($(item).text());
        //         });
        //         $(".app_luZhu_Scope .app_luZhu_Block").hide();
        //         $(".app_luZhu_Scope  .app_luZhu_Block").each(function (i, item) {
        //             for (var i = 0, len = data[0].length; i < len; i++) {
        //                 if (item.getAttribute("ball").indexOf(data[0][i]) > -1 || data[0][i] == "全部") { 
        //                     for (var j = 0, jlen = data[1].length;j< jlen; j++) {
        //                         if (item.getAttribute("ball").indexOf(data[1][j]) > -1 || data[1][j] == "全部") {
        //                             $(item).show();
        //                         }
        //                     } 
        //                 }
        //             } 
        //         })

        //     }
        // })
