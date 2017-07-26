'use strict';

import * as joi from 'joi';

const validateControllerHandler = Symbol('validateControllerHandler');

/** ****************************************
 *
 * 设定基础路由
 *
 * 这个（抽象）类旨在扩展任何自定义路由;
 * 它允许您访问Joi，用于有效载荷验证，以及
 *
 *  @see: https://github.com/hapijs/joi
 *
 ******************************************/

export class BaseRoutes {

    /**
     * Constructor
     * @param {function} controller
     *        回调方法来处理路由
     * @param {string} endpoint [optional]
     *        特定路由的终点，即：/ controller / {action}  /
     */

    constructor(controller, endpoint = '') {
        if (!controller) {
            throw new Error('BaseRoute: 控制器(controller) 是 undefined');
        }
        if (new.target === BaseRoutes) {
            throw Error('BaseRoutes是一个抽象类，不能直接实例化');
        }

        this.joi = joi;
        this.endpoint = endpoint;
        this.controller = controller;
    }

    /**
     * 所有条目
     * @return {object}
     */
    action() {
        this[validateControllerHandler]('action');

        return {
            method: 'GET',
            path: `${this.endpoint}/{action?}`,
            handler: this.controller.action.bind(this.controller),
            config: {
                description: '执行指定控制器的Aciotn',
                tags: ['public']
            }
        };
    }

    [validateControllerHandler](handler) {
        if (typeof this.controller[handler] !== 'function') {
            throw new Error('BaseRoute: controller handler is undefined');
        }
    }
}


