import { Pk10Controller } from '../controllers/pk10.controller';
import { BaseRoutes } from './base.routes';
 


const routes = new class Pk10Routes extends BaseRoutes { 
  constructor() { 
      const endpointName = '/pk10'; 
    super(new Pk10Controller(endpointName), endpointName);
  }
}();


export default [
  routes.action()
];
