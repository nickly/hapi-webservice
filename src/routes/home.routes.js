'use strict';

import { HomeController } from '../controllers/home.controller';
import { BaseRoutes } from './base.routes';

/** Main (global) routes */
const routes = new class HomeRoutes extends BaseRoutes {

    /** Constructor */
    constructor() {
        /* istanbul ignore next */
        const endpointName = '/';

        super(new HomeController(endpointName), endpointName);
    }


    /**
     * 首页
     * @return {object}
     */
    index() {

        return {
            method: 'GET',
            path: `${this.endpoint}`,
            handler: this.controller.index.bind(this.controller),
            config: {
                description: '首页路由配置',
                tags: ['public']
            }
        };
    }

    action() {

        return {
            method: 'GET',
            path: `/home/{action?}`,
            handler: this.controller.action.bind(this.controller),
            config: {
                description: '执行指定控制器的Aciotn',
                tags: ['public']
            }
        };
    }

}();

/** Export public end-points */
export default [
    routes.index(), routes.action()
];