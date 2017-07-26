import Fs from 'fs';
import Path from 'path';
const seoPath = Path.join(__dirname, '../../config/seo');
const seoService = new class SeoService { 

    constructor() {

        this.data={};   
        Fs.readdirSync(seoPath).forEach((file) => {
            if (/.*\.js$/.test(file) && file !== "_seo") {
                this.data[file.replace('.js', '')] = require('../../config/seo/' + file);
            }
        });

        this.getSeo=(skin, controller, action) => {
            let temp=this.data[skin][controller];        
            if (!temp) {
                return this.data[skin].default;
            }
            else {
                return temp = temp[action];
            }
        }
    }
} 


export default seoService;