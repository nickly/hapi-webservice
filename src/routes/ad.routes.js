import { AdController } from '../controllers/ad.controller';
import { BaseRoutes } from './base.routes';



const routes = new class AdRoutes extends BaseRoutes {
    constructor() {
        const endpointName = '/ad';
        super(new AdController(endpointName), endpointName);
    }
}();


export default [
    routes.action()
];