import { Jsk3Controller } from '../controllers/jsk3.controller';
import { BaseRoutes } from './base.routes';
 


const routes = new class Jsk3Routes extends BaseRoutes { 
  constructor() { 
      const endpointName = '/jsk3'; 
    super(new Jsk3Controller(endpointName), endpointName);
  }
}();


export default [
  routes.action()
];
