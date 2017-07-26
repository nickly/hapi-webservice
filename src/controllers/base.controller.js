import Boom from 'boom'; //HTTP友好的错误对象
import logger from '../services/logger.service';
import seo from '../services/seo.service';
import config from '../services/config.service';

/** ****************************************
 *
 * 为所有自定义控制器定义基本架构。
 *
 *  如果要共享，可以使用此类扩展您的控制器;
 *  如果你想初始化，你可以调用方法到所有控制器;
 * 代码调用你的控制器（通过`constructor（）`）
 *
 ******************************************/
export class BaseController {

    /**
     * Constructor
     *
     * @param {stirng} notFoundMsg [optional]
     */
    constructor(endpoint) {
        if (new.target === BaseController) {
            throw Error('BaseController是一个抽象类，不能直接实例化');
        }

        this.endpoint = endpoint;

        this.Boom = Boom;

        this.controllerName = this.endpoint.substring(1);
        this.defaultAction = 'index';

        if (this.controllerName == '') {
            this.controllerName = 'home';
        }

        this.methods = Object.getOwnPropertyNames(Object.getPrototypeOf(this));

        this.title = "";



        // 在这里继续写你的更多代码 ...
    }

    /**
     * 应用模板和数据
     * @param {*数据内容， seo, model, ...} context 
     * @param {*} request 
     * @param {*} reply 
     */
    render(context, request, reply) {

        let action = request.params.action;
        let host = ((process.env.NODE_ENV || 'development') == 'development' ? request.headers.host : request.headers['X-HOST']);
        context.skin = config.app.skin[host] || config.app.skin.default;
        if (this.controllerName != "" && this.controllerName != "home" && this.controllerName != "article") {
            let help = config.help[this.controllerName][action];
            if (help) {
                context.Help = help;
            }
            if (action == 'video') {
                context.backUrl = "/" + this.controllerName + "/history";
                context.layout = {
                    header: 'articleHeader',
                }
            } else {
                context.backUrl = "/";
            }
            context.lotteryName = config.app.lotterys[context.skin][this.controllerName].text
        }
        if (!action) {
            action = this.defaultAction;
        }
        context.cdnUrl = (process.env.CDN || '');

        if (!context.seo) {
            context.seo = seo.getSeo(context.skin, this.controllerName, action);
        }

        //彩种
        context._lotterys = config.app.lotterys[context.skin];
        //网站信息
        context.website = config.app.website[context.skin];

        context.router = { controller: this.controllerName.toLowerCase(), action: action.toLowerCase(), path: request.path, title: this.title };


        const viewPath = `${context.skin}/${this.controllerName}/${action}`;


        return Promise.resolve(reply.view(viewPath, context), {
            layout: context.skin + '/layout/default',
        });
    }

    /**
     * 输出json
     * @param {*} context 
     * @param {*} request 
     * @param {*} reply 
     */
    json(context, request, reply) {
        return Promise.resolve(reply(context).type('application/json;charset=utf-8'));
    }



    //输出HTML
    html(viewPath, data, request, reply) {
        let host = ((process.env.NODE_ENV || 'development') == 'development' ? request.headers.host : request.headers['X-HOST']);
        const skin = config.app.skin[host] || config.app.skin.default;

        return Promise.resolve(reply.view(`${skin}/${viewPath}`, data, {
            layout: skin + '/layout/null',
        }));

    }

    /**跳转 */
    redirect(uri, request, reply) {

        return Promise.resolve(reply.redirect(uri));
    }

    /**
     * 动态路由方法， /{controller}/{action}/{id/}
     * @param {*} request 
     * @param {*} reply 
     */
    action(request, reply) {

        let action = request.params.action;
        if (!action) {
            action = this.defaultAction;
        }

        //处理网址映射大小写无法匹配action
        this.methods.map(method => {
            if (method.toLowerCase() == action.toLowerCase()) {
                action = method;
            }
        });


        if (typeof this[action] != 'function') {

            //throw new Error('没有找到对应的控制器动作');
            return reply.redirect('/home/404');
        }

        try {
            let promise = this[action](request, reply);
            //出错时统一处理
            promise.catch(e => {
                logger.error("程序异常", e, request);
                //return reply.redirect('/home/error');
                this.render({}, request, reply);
            });
        } catch (ex) {
            logger.error("程序异常", ex, request);
            return reply.redirect('/home/404');
        }

    }

}