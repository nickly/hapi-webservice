import { ArticleController } from '../controllers/article.controller';
import { BaseRoutes } from './base.routes';
 


const routes = new class ArticleRoutes extends BaseRoutes { 
  constructor() { 
      const endpointName = '/article'; 
    super(new ArticleController(endpointName), endpointName);
  }
 /**
     * 
     * @return {object}
     */
    details() {

        return {
            method: 'GET',
            path: `/article/{action}/{id}`,
            handler: this.controller.action.bind(this.controller),
            config: {
                description: '详情页路由配置',
                tags: ['public']
            }
        };
    }

  action() {
        return {
            method: 'GET',
            path: `/article/{action}`,
            handler: this.controller.action.bind(this.controller),
            config: {
                description: '执行指定控制器的Aciotn',
                tags: ['public']
            }
        };
    }
}();


export default [
   routes.details(), routes.action()
];
