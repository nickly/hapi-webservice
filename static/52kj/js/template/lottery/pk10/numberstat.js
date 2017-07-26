(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['numberstat.html'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "<script type=\"text/javascript\">\r\n\r\n    var pathArray = [\r\n        'public/index',\r\n        'pk10/numberstat'\r\n    ];\r\n\r\n    seajs.use(pathArray ,function (publicCallBack,indexCallBack) {\r\n\r\n        /** 添加loading */\r\n        publicCallBack.createLoading($('#loading'));\r\n\r\n        $(document).ready(function () {\r\n            indexCallBack.init();\r\n        })\r\n    })\r\n</script>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<section class=\"app_index_Scope\">\r\n    <div class=\"app_public_statisticsBlock\">\r\n        <!--浮动表格-->\r\n        <div class=\"statistics_title\">\r\n            <table>\r\n                <tr>\r\n                    <td><span class=\"titleW\">日期</span></td>\r\n                </tr>\r\n                <tr>\r\n                    <td><span class=\"titleW\">2017-4-26</span></td>\r\n                </tr>\r\n                <tr>\r\n                    <td><span class=\"titleW\">2017-4-26</span></td>\r\n                </tr>\r\n                <tr>\r\n                    <td><span class=\"titleW\">2017-4-26</span></td>\r\n                </tr>\r\n                <tr>\r\n                    <td><span class=\"titleW\">2017-4-26</span></td>\r\n                </tr>\r\n                <tr>\r\n                    <td><span class=\"titleW\">2017-4-26</span></td>\r\n                </tr>\r\n                <tr>\r\n                    <td><span class=\"titleW\">2017-4-26</span></td>\r\n                </tr>\r\n                <tr>\r\n                    <td><span class=\"titleW\">2017-4-26</span></td>\r\n                </tr>\r\n            </table>\r\n        </div>\r\n        <!--表格-->\r\n        <div class=\"statistics_content\" id=\"wrapper\">\r\n            <div class=\"sc_block\" id=\"result\">\r\n                <table>\r\n                    <tr class=\"titleBg\">\r\n                        <td><span class=\"titleW\">日期</span></td>\r\n                        <td><span class=\"range\">0</span></td>\r\n                        <td><span class=\"range\">1</span></td>\r\n                        <td><span class=\"range\">2</span></td>\r\n                        <td><span class=\"range\">3</span></td>\r\n                        <td><span class=\"range\">4</span></td>\r\n                        <td><span class=\"range\">5</span></td>\r\n                        <td><span class=\"range\">6</span></td>\r\n                        <td><span class=\"range\">7</span></td>\r\n                        <td><span class=\"range\">8</span></td>\r\n                        <td><span class=\"range\">9</span></td>\r\n                        <td><span class=\"range\">10</span></td>\r\n                        <td><span class=\"range\">11</span></td>\r\n                        <td><span class=\"range\">12</span></td>\r\n                        <td><span class=\"range\">13</span></td>\r\n                        <td><span class=\"range\">14</span></td>\r\n                        <td><span class=\"range\">15</span></td>\r\n                        <td><span class=\"range\">16</span></td>\r\n                        <td><span class=\"range\">17</span></td>\r\n                        <td><span class=\"range\">18</span></td>\r\n                        <td><span class=\"range\">19</span></td>\r\n                    </tr>\r\n                    <tr>\r\n                        <td class=\"titleBg\"><span class=\"titleW\">2017-4-26</span></td>\r\n                        <td><span class=\"range\">41</span></td>\r\n                        <td><span class=\"range\">40</span></td>\r\n                        <td><span class=\"range\">38</span></td>\r\n                        <td><span class=\"range\">43</span></td>\r\n                        <td><span class=\"range\">38</span></td>\r\n                        <td><span class=\"range\">41</span></td>\r\n                        <td><span class=\"range\">38</span></td>\r\n                        <td><span class=\"range\">41</span></td>\r\n                        <td><span class=\"range\">38</span></td>\r\n                        <td><span class=\"range\">41</span></td>\r\n                        <td><span class=\"range\">41</span></td>\r\n                        <td><span class=\"range\">40</span></td>\r\n                        <td><span class=\"range\">38</span></td>\r\n                        <td><span class=\"range\">43</span></td>\r\n                        <td><span class=\"range\">38</span></td>\r\n                        <td><span class=\"range\">41</span></td>\r\n                        <td><span class=\"range\">38</span></td>\r\n                        <td><span class=\"range\">41</span></td>\r\n                        <td><span class=\"range\">38</span></td>\r\n                        <td><span class=\"range\">41</span></td>\r\n                    </tr>\r\n                    <tr>\r\n                        <td class=\"titleBg\"><span class=\"titleW\">2017-4-26</span></td>\r\n                        <td><span class=\"range\">41</span></td>\r\n                        <td><span class=\"range\">40</span></td>\r\n                        <td><span class=\"range\">38</span></td>\r\n                        <td><span class=\"range\">43</span></td>\r\n                        <td><span class=\"range\">38</span></td>\r\n                        <td><span class=\"range\">41</span></td>\r\n                        <td><span class=\"range\">38</span></td>\r\n                        <td><span class=\"range\">41</span></td>\r\n                        <td><span class=\"range\">38</span></td>\r\n                        <td><span class=\"range\">41</span></td>\r\n                        <td><span class=\"range\">41</span></td>\r\n                        <td><span class=\"range\">40</span></td>\r\n                        <td><span class=\"range\">38</span></td>\r\n                        <td><span class=\"range\">43</span></td>\r\n                        <td><span class=\"range\">38</span></td>\r\n                        <td><span class=\"range\">41</span></td>\r\n                        <td><span class=\"range\">38</span></td>\r\n                        <td><span class=\"range\">41</span></td>\r\n                        <td><span class=\"range\">38</span></td>\r\n                        <td><span class=\"range\">41</span></td>\r\n                    </tr>\r\n                    <tr>\r\n                        <td class=\"titleBg\"><span class=\"titleW\">2017-4-26</span></td>\r\n                        <td><span class=\"range\">41</span></td>\r\n                        <td><span class=\"range\">40</span></td>\r\n                        <td><span class=\"range\">38</span></td>\r\n                        <td><span class=\"range\">43</span></td>\r\n                        <td><span class=\"range\">38</span></td>\r\n                        <td><span class=\"range\">41</span></td>\r\n                        <td><span class=\"range\">38</span></td>\r\n                        <td><span class=\"range\">41</span></td>\r\n                        <td><span class=\"range\">38</span></td>\r\n                        <td><span class=\"range\">41</span></td>\r\n                        <td><span class=\"range\">41</span></td>\r\n                        <td><span class=\"range\">40</span></td>\r\n                        <td><span class=\"range\">38</span></td>\r\n                        <td><span class=\"range\">43</span></td>\r\n                        <td><span class=\"range\">38</span></td>\r\n                        <td><span class=\"range\">41</span></td>\r\n                        <td><span class=\"range\">38</span></td>\r\n                        <td><span class=\"range\">41</span></td>\r\n                        <td><span class=\"range\">38</span></td>\r\n                        <td><span class=\"range\">41</span></td>\r\n                    </tr>\r\n                    <tr>\r\n                        <td class=\"titleBg\"><span class=\"titleW\">2017-4-26</span></td>\r\n                        <td><span class=\"range\">41</span></td>\r\n                        <td><span class=\"range\">40</span></td>\r\n                        <td><span class=\"range\">38</span></td>\r\n                        <td><span class=\"range\">43</span></td>\r\n                        <td><span class=\"range\">38</span></td>\r\n                        <td><span class=\"range\">41</span></td>\r\n                        <td><span class=\"range\">38</span></td>\r\n                        <td><span class=\"range\">41</span></td>\r\n                        <td><span class=\"range\">38</span></td>\r\n                        <td><span class=\"range\">41</span></td>\r\n                        <td><span class=\"range\">41</span></td>\r\n                        <td><span class=\"range\">40</span></td>\r\n                        <td><span class=\"range\">38</span></td>\r\n                        <td><span class=\"range\">43</span></td>\r\n                        <td><span class=\"range\">38</span></td>\r\n                        <td><span class=\"range\">41</span></td>\r\n                        <td><span class=\"range\">38</span></td>\r\n                        <td><span class=\"range\">41</span></td>\r\n                        <td><span class=\"range\">38</span></td>\r\n                        <td><span class=\"range\">41</span></td>\r\n                    </tr>\r\n                    <tr>\r\n                        <td class=\"titleBg\"><span class=\"titleW\">2017-4-26</span></td>\r\n                        <td><span class=\"range\">41</span></td>\r\n                        <td><span class=\"range\">40</span></td>\r\n                        <td><span class=\"range\">38</span></td>\r\n                        <td><span class=\"range\">43</span></td>\r\n                        <td><span class=\"range\">38</span></td>\r\n                        <td><span class=\"range\">41</span></td>\r\n                        <td><span class=\"range\">38</span></td>\r\n                        <td><span class=\"range\">41</span></td>\r\n                        <td><span class=\"range\">38</span></td>\r\n                        <td><span class=\"range\">41</span></td>\r\n                        <td><span class=\"range\">41</span></td>\r\n                        <td><span class=\"range\">40</span></td>\r\n                        <td><span class=\"range\">38</span></td>\r\n                        <td><span class=\"range\">43</span></td>\r\n                        <td><span class=\"range\">38</span></td>\r\n                        <td><span class=\"range\">41</span></td>\r\n                        <td><span class=\"range\">38</span></td>\r\n                        <td><span class=\"range\">41</span></td>\r\n                        <td><span class=\"range\">38</span></td>\r\n                        <td><span class=\"range\">41</span></td>\r\n                    </tr>\r\n                    <tr>\r\n                        <td class=\"titleBg\"><span class=\"titleW\">2017-4-26</span></td>\r\n                        <td><span class=\"range\">41</span></td>\r\n                        <td><span class=\"range\">40</span></td>\r\n                        <td><span class=\"range\">38</span></td>\r\n                        <td><span class=\"range\">43</span></td>\r\n                        <td><span class=\"range\">38</span></td>\r\n                        <td><span class=\"range\">41</span></td>\r\n                        <td><span class=\"range\">38</span></td>\r\n                        <td><span class=\"range\">41</span></td>\r\n                        <td><span class=\"range\">38</span></td>\r\n                        <td><span class=\"range\">41</span></td>\r\n                        <td><span class=\"range\">41</span></td>\r\n                        <td><span class=\"range\">40</span></td>\r\n                        <td><span class=\"range\">38</span></td>\r\n                        <td><span class=\"range\">43</span></td>\r\n                        <td><span class=\"range\">38</span></td>\r\n                        <td><span class=\"range\">41</span></td>\r\n                        <td><span class=\"range\">38</span></td>\r\n                        <td><span class=\"range\">41</span></td>\r\n                        <td><span class=\"range\">38</span></td>\r\n                        <td><span class=\"range\">41</span></td>\r\n                    </tr>\r\n                    <tr>\r\n                        <td class=\"titleBg\"><span class=\"titleW\">2017-4-26</span></td>\r\n                        <td><span class=\"range\">41</span></td>\r\n                        <td><span class=\"range\">40</span></td>\r\n                        <td><span class=\"range\">38</span></td>\r\n                        <td><span class=\"range\">43</span></td>\r\n                        <td><span class=\"range\">38</span></td>\r\n                        <td><span class=\"range\">41</span></td>\r\n                        <td><span class=\"range\">38</span></td>\r\n                        <td><span class=\"range\">41</span></td>\r\n                        <td><span class=\"range\">38</span></td>\r\n                        <td><span class=\"range\">41</span></td>\r\n                        <td><span class=\"range\">41</span></td>\r\n                        <td><span class=\"range\">40</span></td>\r\n                        <td><span class=\"range\">38</span></td>\r\n                        <td><span class=\"range\">43</span></td>\r\n                        <td><span class=\"range\">38</span></td>\r\n                        <td><span class=\"range\">41</span></td>\r\n                        <td><span class=\"range\">38</span></td>\r\n                        <td><span class=\"range\">41</span></td>\r\n                        <td><span class=\"range\">38</span></td>\r\n                        <td><span class=\"range\">41</span></td>\r\n                    </tr>\r\n                </table>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</section>\r\n"
    + ((stack1 = (helpers.section || (depth0 && depth0.section) || helpers.helperMissing).call(depth0 != null ? depth0 : {},"js",{"name":"section","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});
})();