'use strict';

String.prototype.DateFormat = function(format) {
    var dateStr = this.toString();
    /*
     * eg:format="YYYY-MM-dd hh:mm:ss";
     */
    dateStr = dateStr.replace("T", " ").replace(/-/g, "/");
    var obj = new Date(dateStr);
    var o = {
        "M+": obj.getMonth() + 1, // month
        "d+": obj.getDate(), // day
        "h+": obj.getHours(), // hour
        "m+": obj.getMinutes(), // minute
        "s+": obj.getSeconds(), // second
        "q+": Math.floor((obj.getMonth() + 3) / 3), // quarter
        "S": obj.getMilliseconds()
    }

    if (/(Y+)/.test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length == 4 ? obj.getFullYear() : (obj.getFullYear() + "")
            .substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] :
                ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
};

Date.prototype.format = function(format) {
        var date = {
            "M+": this.getMonth() + 1,
            "d+": this.getDate(),
            "h+": this.getHours(),
            "m+": this.getMinutes(),
            "s+": this.getSeconds(),
            "q+": Math.floor((this.getMonth() + 3) / 3),
            "S+": this.getMilliseconds()
        };
        if (/(y+)/i.test(format)) {
            format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        for (var k in date) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
            }
        }
        return format;
    }
    //补齐0
if (!String.prototype.zfill) {
    String.prototype.zfill = function(len) {
        if (len == undefined || typeof len != 'number' || this.length >= len) { return this.toString() }
        return Array(len - this.length + 1).join('0') + this;
    }
}