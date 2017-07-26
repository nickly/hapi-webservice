import { CqsscController } from '../controllers/cqssc.controller';
import { BaseRoutes } from './base.routes';


const routes = new class CqsscRoutes extends BaseRoutes {

  /**
   * Constructor
   */
  constructor() {
    const endpointName = '/cqssc';
    super(new CqsscController(endpointName), endpointName);
  }


}();

//
// Export public end-points
//
export default [
  routes.action()
];
