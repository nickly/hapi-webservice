const configService = new class SeoService {
    constructor() {
        this.app = require('../../config/app');
        this.help = require('../../config/help');
    }
}
export default configService;