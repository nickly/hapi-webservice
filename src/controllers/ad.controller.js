import req from 'request';
import { BaseController } from './base.controller';
import { AdService } from '../services/ad.service';
/**Controller for 'main'*/
export class AdController extends BaseController {

    /**Constructor */
    constructor(endpoint) {
        super(endpoint);
        this.adService = new AdService();
    }

    /*获取所有广告信息*/
    getAdList(request, reply) {
        return this.adService.getAdList(request.query.codes).then(result => {
            this.json(result, request, reply);
        });
    }
}