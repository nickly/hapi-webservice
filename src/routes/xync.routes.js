import { XyncController } from '../controllers/xync.controller';
import { BaseRoutes } from './base.routes';



const routes = new class XyncRoutes extends BaseRoutes {
    constructor() {
        const endpointName = '/xync';
        super(new XyncController(endpointName), endpointName);
    }


}();


export default [
    routes.action()
];