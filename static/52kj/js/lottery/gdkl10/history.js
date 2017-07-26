seajs.use(['lottery/gdkl10/public/index', 'Array'], function (index, arrayObj) {


    $(document).ready(function () {

        index.init();

        index.tableFilter($('.table_req_filter'));//显示条件筛选 

        var len = 0, temp = "", r = false, tempnumber = 0;
        var colors = ["gray", "red", "purple", "soil", "blue", "green", "orange", "brown", "darkPurple"];

        var object = {
            screen: {
                number: "",
                twoside: ""
            },
            twoside: {
                data: {
                    "0": [1, 3, 5, 7, 9, 11, 13, 15, 17, 19],
                    "1": [2, 4, 6, 8, 10, 12, 14, 16, 18, 20],
                    "2": [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
                    "3": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                    "02": [11, 13, 15, 17, 19],
                    "03": [1, 3, 5, 7, 9], 
                    "12": [12, 14, 16, 18, 20],
                    "13": [2, 4, 6, 8, 10] 
                },
                spans: document.querySelectorAll(".app_table_requirement ul li span.twoside")
            },
            clone: {
                data: $("#history tbody").clone()
            }
        };
        object.clone.numbers = $(object.clone.data).find("tr td div i");



        //开奖倒计时回调

        index.countdownTime(function (result) {

            if (result) {
                var html = "<td>" + (result.current.date.replace(/-/g, '') + "-") + (Number(result.current.period) > 9 ? result.current.period : "0" + result.current.period) + "</td><td>" + result.current.time + "</td><td><div class='app_lottery_gdklsf'>";

                var data = result.current.award.split(",");
                var objColors = {};
                for (var k = 0; k < data.length; k++) {
                    html += '<i class="' + colors[k] + '">' + data[k] + '</i>';
                    objColors[data[k]] = colors[k];//收集颜色
                }
                html += "</div></td>";

                var tr = document.createElement("tr");
                tr.innerHTML = html;

                //颜色处理
                for (var l = 0; l < len; l++) {
                    temp = object.clone.numbers[l];
                    temp.className = objColors[temp.innerText] || "gray";
                }

                object.clone.data[0].insertBefore(tr, object.clone.data[0].firstChild);
                $("#history tbody").html(object.clone.data[0].innerHTML);

                object.clone.numbers = $(object.clone.data).find("tr td div i");
                len += 8;
            }
        });




        //日期选择
        index.selectDay("gethistory", 1, function (data) {
            $("#history tbody").html(data);

            object.clone.data = $("#history tbody").clone();
            object.clone.numbers = $(object.clone.data).find("tr td div i");
            len = object.clone.numbers.length;
        });

        //筛选
        len = object.clone.numbers.length;
        var code = "", ele = null, active = false, twosideIdx = 0;


        document.querySelector(".app_table_requirement ul").onclick = function (event) {
            ele = event.target;
            var recovery = $(".app_table_requirement ul li:last-child span");
            if (ele.tagName == "SPAN") {
                code = ele.getAttribute("data-code");
                if (code == "-1") {
                    $(".app_table_requirement ul li span").removeClass("active");
                    recovery.removeClass("fontOrange");
                    object.screen = { number: "", twoside: "" };
                    object.screenFn(true);
                }
                else {
                    active = ele.className == "active";

                    if (active) {
                        ele.className = "";
                        var count = $(".app_table_requirement li span.active").length;
                        if (count == 0) {
                            recovery.removeClass("fontOrange");
                        }
                        if (code == null) {
                            object.screen.number = object.screen.number.replace((ele.innerText.length > 1 ? ele.innerText : "0" + ele.innerText) + ",", "")
                        }
                        else if (Number(code) > -1) {
                            ele.className = "";
                            object.screen.twoside = object.screen.twoside.replace(code, "");
                        }
                    }
                    else {
                        ele.className = "active";
                        recovery.addClass("fontOrange");
                        if (code == null) {
                            object.screen.number += (ele.innerText.length > 1 ? ele.innerText : "0" + ele.innerText) + ",";
                        }
                        else {
                            twosideIdx = Number(code);
                            if (twosideIdx < 2) {
                                object.screen.twoside = twosideIdx + object.screen.twoside;
                                twosideIdx = 1 - twosideIdx;
                            }
                            else {
                                object.screen.twoside = object.screen.twoside + twosideIdx;
                                twosideIdx = (3 - twosideIdx) + 2;
                            }
                            object.twoside.spans[twosideIdx].className = "";
                            object.screen.twoside = object.screen.twoside.replace(twosideIdx, "");
                        }
                    }
                }
                object.screenFn(false);
            }
        }

        object.screenFn = function (all) {
            for (var i = 0; i < len; i++) {
                temp = object.clone.numbers[i];
                r = false;


                if (!all) {
                    tempnumber = temp.innerText;
                    if (object.screen.number != "") {
                        r = object.screen.number.indexOf(tempnumber + ",") > -1;
                    }
                    if (!r) {
                        //交集
                        tempnumber = Number(tempnumber);
                        if (object.screen.twoside != "") {
                            var twosidedata = object.twoside.data[object.screen.twoside];
                            for (var j = 0; j < twosidedata.length; j++) {
                                if (tempnumber == twosidedata[j]) {
                                    r = true;
                                    break;
                                }
                            }
                        }
                    }
                }

                if (r) {
                    if (temp.className.indexOf("active") < 0) {
                        temp.className += " active";
                    }
                }
                else {
                    temp.className = temp.className.replace(" active", "");
                }
            }
            $("#history tbody").html(object.clone.data[0].innerHTML);
        }
    })
});