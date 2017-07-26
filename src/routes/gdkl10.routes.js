import { Gdkl10Controller } from '../controllers/gdkl10.controller';
import { BaseRoutes } from './base.routes';



const routes = new class Gdkl10Routes extends BaseRoutes {
  constructor() {
    const endpointName = '/gdkl10';
    super(new Gdkl10Controller(endpointName), endpointName);
  }


  // html() {
  //     const route = super.action();
  //     route.config.description = 'Create a HTML';
  //     route.config.validate = {
  //       payload: {
  //         data: this.Joi.date().iso().max('now').required().description('时间')
  //       }
  //     };
  //     return route;
  // }  

}();


export default [
  routes.action()
];
